import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FirstCharComponent } from './first-char/first-char.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserDetailsComponent,FirstCharComponent],
  exports:[ UserDetailsComponent,
    FirstCharComponent,
  CommonModule,
FormsModule]
})
export class SharedModule { 
 
}
