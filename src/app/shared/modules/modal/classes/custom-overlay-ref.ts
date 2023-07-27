import {OverlayRef} from '@angular/cdk/overlay';
import {TemplateRef, Type} from '@angular/core';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {CustomOverlayConfig} from '../interfaces/custom-overlay-config';
import {OverlayCloseEvent, OverlayCloseEventType} from '../interfaces/overlay-close-event';
import { OverlayService } from "@modules/modal";

export class CustomOverlayRef<R = any | null, T = any> {

  private static uid = 0;
  id = CustomOverlayRef.uid++;
  afterClosed$ = new Subject<OverlayCloseEvent<T | null>>();
  private destroyStream$ = new Subject();
  backdropClickData: T | null = null;

  constructor(
    public readonly overlay: OverlayRef,
    public readonly content: string | TemplateRef<any> | Type<any>,
    public readonly data: T,
    public readonly overlayService: OverlayService,
    private customOverlayConfig?: CustomOverlayConfig,
  ) {
    this.onBackdropClick();
  }

  close(data: T | null, closeType: OverlayCloseEventType = 'close') {
    this.dispose(closeType, data);
  }

  setBackdropClickData(data: T): void {
    this.backdropClickData = data;
  }

  private dispose(type: OverlayCloseEventType, data: T | null) {
    this.overlay.dispose();
    this.afterClosed$.next({
      type,
      data,
    });
    this.destroy();
  }

  removeLastModalRef(): void {
    this.overlayService.removeLastModalRef(this.content, this.id);
  }

  private onBackdropClick(): void {
    const config = this.customOverlayConfig;
    const preventBackdropClick = config && config.preventBackdropClick;
    if (preventBackdropClick) {
      return;
    }
    this.overlay.backdropClick()
      .pipe(
        take(1),
        takeUntil(this.destroyStream$),
      )
      .subscribe(() => this.dispose('backdropClick', this.backdropClickData));
  }

  private destroy(): void {
    this.destroyStream$.next({});
    this.destroyStream$.complete();
    this.afterClosed$.complete();
  }
}
