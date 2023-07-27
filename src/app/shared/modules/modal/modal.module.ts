import { Injector, NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './components/overlay/overlay.component';
import { Overlay, OverlayModule } from "@angular/cdk/overlay";
import { TestTaskModalConfig } from "@modules/modal/interfaces/test-task-modal-config";
import { OverlayRefStorageService } from "@modules/modal/services/overlay-ref-storage.service";
import { OverlayService } from "@modules/modal/services/overlay.service";
import { MODAL_DATA, TEST_TASK_MODAL_CONFIG } from "@modules/modal/classes/modal-data";
import { PortalModule } from "@angular/cdk/portal";
import { CustomOverlayRef } from "@modules/modal/classes";

export const overlayServiceFactory = (
  overlay: Overlay,
  injector: Injector,
  config: TestTaskModalConfig,
  zone: NgZone,
  overlayRefStorageService: OverlayRefStorageService,
): OverlayService => new OverlayService(overlay, injector, config, zone, overlayRefStorageService);


@NgModule({
  declarations: [
    OverlayComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [
    { provide: MODAL_DATA, useValue: {} },
    { provide: TEST_TASK_MODAL_CONFIG, useValue: {} },
    { provide: CustomOverlayRef, useValue: {} },
    {
      provide: OverlayService,
      useFactory: overlayServiceFactory,
      deps: [Overlay, Injector, TEST_TASK_MODAL_CONFIG, NgZone, OverlayRefStorageService],
    }
  ]
})
export class ModalModule { }
