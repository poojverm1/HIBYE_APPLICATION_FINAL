import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {RemoveSpecialCharPipe} from './../shared/removeSpecialChar.Pipe'



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'chat',component:ChatboxComponent}
    ]),
    SharedModule
  ],
  declarations: [ChatboxComponent,RemoveSpecialCharPipe],
  providers:[]
})
export class ChatModule { }
