import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { OverlayModule } from "@angular/cdk/overlay";
import { TooltipService } from "./services/tooltip.service";



@NgModule({
  declarations: [
    TooltipComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    TooltipDirective,
  ],
  providers: [
    TooltipService,
  ],
})
export class TooltipModule { }
