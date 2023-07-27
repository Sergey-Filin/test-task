import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[minMaxValue]'
})
export class MinimumValueDirective {

  @Input() minMax = false;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInputChange() {
    if (this.minMax) {
      const inputValue = this.elementRef.nativeElement.value;
      const numericValue = Number(inputValue);

      if (isNaN(numericValue) || numericValue < 1000 || numericValue > 1000000) {
        this.elementRef.nativeElement.value = Math.max(1000, Math.min(numericValue, 1000000)).toString();
      }
    }
  }
}
