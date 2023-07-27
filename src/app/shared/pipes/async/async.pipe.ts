import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from "rxjs";

@Pipe({
  name: 'appAsync',
  pure: false,
})
export class AsyncPipe implements PipeTransform, OnDestroy {

  private observable?: Observable<any>;
  private subscription?: Subscription;
  private value?: any;

  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  transform<T>(observable?: Observable<T>): T | null {
    if(!observable) {
      this.dispose();
      return null;
    }

    if(!this.observable) {
      this.observable = observable;
      this.subscription = this.observable.subscribe(value => {
        this.value = value;
        this.cdr.detectChanges();
      })
    }

    if(this.observable !== observable) {
      this.dispose();
      return this.transform(observable);
    }

    return this.value || null;
  }

  private dispose(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    this.observable = undefined;
    this.value = undefined;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
