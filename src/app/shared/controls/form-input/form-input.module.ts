import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './components/form-input/form-input.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MinimumValueModule } from "@directives/minimum-value";

@NgModule({
  declarations: [
    FormInputComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MinimumValueModule
  ],
  exports: [FormInputComponent]
})
export class FormInputModule { }
