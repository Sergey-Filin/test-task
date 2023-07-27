import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TestTaskIconRegistryService } from "@modules/test-task-icons/services/test-task-icon-registry.service";
import { starIcon, toolTipIcon } from "@modules/test-task-icons/testTaskIcons";
import { TestTaskIconsModule } from "@modules/test-task-icons";
import { HomeComponent } from "./components/home.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormInputModule } from "../../shared/controls/form-input";
import { TooltipModule } from "@directives/tooltip";
import { ReactiveFormsModule } from "@angular/forms";
import { TapBarModule } from "@modules/tap-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { HomeService } from "./services/home.service";
import { MatInputModule } from "@angular/material/input";
import { MinimumValueModule } from "@directives/minimum-value";
import { TestTaskSelectModule } from "../../shared/controls/test-task-select";
import { ToggleCheckboxModule } from "../../shared/controls/toggle-checkbox";
import { HomeNotificationComponent } from './components/home-notification/home-notification.component';
import { AsyncModule } from "../../shared/pipes";

@NgModule({
  declarations: [HomeComponent, HomeNotificationComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        TestTaskIconsModule,
        MatSlideToggleModule,
        FormInputModule,
        TooltipModule,
        ReactiveFormsModule,
        TapBarModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MinimumValueModule,
        TestTaskSelectModule,
        ToggleCheckboxModule,
        AsyncModule,
    ],
  providers: [HomeService]
})
export class HomeModule {
  constructor(private readonly testTaskIconRegistryService: TestTaskIconRegistryService) {
    testTaskIconRegistryService.registryIcons([
      starIcon,
      toolTipIcon,
    ])
  }
}
