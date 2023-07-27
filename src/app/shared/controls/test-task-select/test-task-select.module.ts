import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTaskSelectComponent } from './components/test-task-select/test-task-select.component';
import { TestTaskGroupComponent } from './components/test-task-group/test-task-group.component';
import { TestTaskOptionComponent } from './components/test-task-option/test-task-option.component';
import { TestTaskFormFieldModule } from "../test-task-form-field";
import { TestTaskDropdownModule } from "../test-task-dropdown";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "@modules/modal";

@NgModule({
  declarations: [
    TestTaskSelectComponent,
    TestTaskGroupComponent,
    TestTaskOptionComponent
  ],
  exports: [
    TestTaskSelectComponent,
    TestTaskOptionComponent,
    TestTaskGroupComponent
  ],
  imports: [
    CommonModule,
    TestTaskFormFieldModule,
    TestTaskDropdownModule,
    ReactiveFormsModule,
    ModalModule
  ]
})
export class TestTaskSelectModule { }
