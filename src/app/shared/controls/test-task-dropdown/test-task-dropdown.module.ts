import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTaskDropdownComponent } from './components/test-task-dropdown/test-task-dropdown.component';
import { PortalModule } from "@angular/cdk/portal";



@NgModule({
    declarations: [
        TestTaskDropdownComponent
    ],
    exports: [
        TestTaskDropdownComponent
    ],
  imports: [
    CommonModule,
    PortalModule
  ]
})
export class TestTaskDropdownModule { }
