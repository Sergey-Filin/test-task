import {OnDestroy, Directive} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface DestroyStreamI {
  destroyStream$: Observable<void>;
  destroy(): void;
}

@Directive()
export class DestroySubscription implements DestroyStreamI, OnDestroy {
  private readonly destroySubject$ = new Subject<void>();

  get destroyStream$(): Observable<void> {
    return this.destroySubject$.asObservable();
  }
  destroy(): void {
    const destroy = this.destroySubject$;
    if (destroy?.isStopped) {
      return;
    }
    destroy.next();
    destroy.unsubscribe();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
