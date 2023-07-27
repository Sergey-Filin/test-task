import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [
    TabBarComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [
    TabBarComponent
  ]
})
export class TapBarModule { }
