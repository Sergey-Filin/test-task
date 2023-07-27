import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinimumValueDirective } from './directive/minimum-value.directive';

@NgModule({
  declarations: [
    MinimumValueDirective
  ],
  imports: [
    CommonModule
  ], exports: [MinimumValueDirective]
})
export class MinimumValueModule { }
