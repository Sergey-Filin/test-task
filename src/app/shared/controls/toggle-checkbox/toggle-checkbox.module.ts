import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleCheckboxComponent } from './components/toggle-checkbox/toggle-checkbox.component';



@NgModule({
  declarations: [
    ToggleCheckboxComponent
  ],
  exports: [
    ToggleCheckboxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ToggleCheckboxModule { }
