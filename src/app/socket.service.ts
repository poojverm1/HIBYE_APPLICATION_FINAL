import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


import { Observable, EMPTY, throwError } from 'rxjs';
import {catchError} from "rxjs/internal/operators";
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  
  private url = 'https://chatapi.edwisor.com';

  private socket;


  constructor(public http: HttpClient) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);

  }

  // events to be listened 

  public verifyUser = () => {

    return Observable.create((observer) => {

      this.socket.on('verifyUser', (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end verifyUser
  public onlineUserList = () => {

    return Observable.create((observer) => {

      this.socket.on("online-user-list", (userList) => {

        observer.next(userList);

      }); // end Socket

    }); // end Observable

  } // end onlineUserList


  public disconnectedSocket = () => {

    return Observable.create((observer) => {

      this.socket.on("disconnect", () => {

        observer.next();

      }); // end Socket

    }); // end Observable



  } // end disconnectSocket

  // end events to be listened

  // events to be emitted

  public setUser = (authToken) => {

    this.socket.emit("set-user", authToken);

  } // end setUser
  public SendChatMessage = (chatMsgObject) => {

    this.socket.emit('chat-msg', chatMsgObject);

  } // end getChatMessage


  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

  public chatByUserId = (userId) => {

    return Observable.create((observer) => {
      
      this.socket.on(userId, (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end chatByUserId

  public markChatAsSeen = (userDetails) => {

    this.socket.emit('mark-chat-as-seen', userDetails);

  } // end markChatAsSeen
 
  
  public getChat(senderId, receiverId, skip): Observable<any> {

    return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authtoken')}`);
    catchError( err => {
      if (err.status == 401) { 
    data => console.log('Data Received');
     }
      else{
        return throwError(err);
      }
    })

  }

  public exitSocket = () =>{


    this.socket.disconnect();


  }// end exit socket
  
  
}
