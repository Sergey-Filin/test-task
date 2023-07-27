import {
  ComponentType,
  ConnectedPosition,
  ConnectionPositionPair,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  filter,
  fromEvent,
  merge,
  Observable,
  Subject,
} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

import {DestroySubscription} from '@helpers/classes/destroy-subscription';

import {TooltipService} from '../services/tooltip.service';

const DEFAULT_TOOLTIP_POSITION: ConnectedPosition[] = [
  new ConnectionPositionPair(
    {originX: 'center', originY: 'top'},
    {overlayX: 'center', overlayY: 'bottom'},
    40,
    -5,
    ['testTask-tooltip', 'tooltip-pane', 'top'],
  ),
];

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective extends DestroySubscription implements AfterViewInit, OnDestroy {

  @Input() set enabled(val: boolean) {
    if (!val) {
      this.destroyEvents();
      return;
    }
    this.addEvents();
  }

  @Input() content: any = '';
  @Input() componentForPortal: ComponentType<any> | undefined;
  @Input() config: OverlayConfig | undefined;
  @Input() positions: ConnectedPosition[] = DEFAULT_TOOLTIP_POSITION;

  private overlayRef: OverlayRef | null;
  private readonly destroyEventSubject: Subject<void> = new Subject();

  protected get destroyEventStream$(): Observable<void> {
    return this.destroyEventSubject.asObservable();
  }

  constructor(
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly tooltipService: TooltipService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    if (!this.enabled) {
      this.onMouseClick();
      return;
    }
    this.addEvents();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.close();
    this.destroyEventSubject.next();
    this.destroyEventSubject.complete();
  }

  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    e.stopPropagation();
  }

  private addEvents(): void {
    this.onMouseEnter();
  }

  private destroyEvents(): void {
    this.destroyEventSubject.next();
  }

  private onMouseClick(): void {
    if (!this.elRef) {
      return;
    }
    if (this.overlayRef) {
      return;
    }
    fromEvent(this.elRef.nativeElement, 'mouseup')
      .pipe(
        debounceTime(0),
        takeUntil(this.destroyEventStream$),
      ).subscribe(() => {
      if (this.overlayRef) {
        this.overlayRef.updatePosition();
        return;
      }
      const ref = this.tooltipService.create(this.elRef, this.content, this.positions, this.componentForPortal, this.config);
      this.overlayRef = ref;
      this.onMouseLeave(ref.overlayElement);
    });
  }

  private onMouseEnter(): void {
    if (!this.elRef) {
      return;
    }
    if (this.overlayRef) {
      return;
    }
    fromEvent(this.elRef.nativeElement, 'mouseover')
      .pipe(
        debounceTime(0),
        takeUntil(this.destroyEventStream$),
      ).subscribe(() => {
      if (this.overlayRef) {
        this.overlayRef.updatePosition();
        return;
      }
      const ref = this.tooltipService.create(this.elRef, this.content, this.positions, this.componentForPortal, this.config);
      this.overlayRef = ref;
      this.onMouseLeave(ref.overlayElement);
    });
  }

  private onMouseLeave(overlayRef: HTMLElement): void {
    if (!this.elRef) {
      return;
    }
    merge(
      fromEvent(this.elRef.nativeElement, 'mouseleave'),
      fromEvent(overlayRef, 'mouseleave'),
    ).pipe(
      filter(Boolean),
      takeUntil(this.destroyEventStream$),
    ).subscribe(() => this.close());
  }

  private close(): void {
    if (!this.overlayRef) {
      return;
    }
    this.overlayRef.detach();
    this.overlayRef = null;
  }
}
