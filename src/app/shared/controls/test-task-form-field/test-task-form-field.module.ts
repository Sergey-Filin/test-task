import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTaskFormFieldComponent } from './components/test-task-form-field/test-task-form-field.component';
import { PrefixDirective } from './directives/prefix/prefix.directive';
import { SuffixDirective } from './directives/suffix/suffix.directive';

@NgModule({
    declarations: [
        TestTaskFormFieldComponent,
        PrefixDirective,
        SuffixDirective
    ],
  exports: [
    TestTaskFormFieldComponent,
    SuffixDirective
  ],
    imports: [
        CommonModule
    ]
})
export class TestTaskFormFieldModule { }
