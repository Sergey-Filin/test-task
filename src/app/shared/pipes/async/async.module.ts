import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from './async.pipe';



@NgModule({
  declarations: [
    AsyncPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AsyncPipe
  ]
})
export class AsyncModule { }
