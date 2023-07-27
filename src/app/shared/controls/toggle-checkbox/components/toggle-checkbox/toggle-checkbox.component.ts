import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {DestroySubscription} from '@helpers';

@Component({
  selector: 'app-toggle-checkbox',
  templateUrl: './toggle-checkbox.component.html',
  styleUrls: ['./toggle-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleCheckboxComponent),
      multi: true,
    },
  ],
})
export class ToggleCheckboxComponent extends DestroySubscription implements ControlValueAccessor {

  static nextId = 0;
  readonly id = `seazone-toggle-checkbox-${ToggleCheckboxComponent.nextId++}`;

  @Input() set value(value: any) {
    if (value !== this.controlValue) {
      this.controlValue = !!value;
      this.setInputValue(this.controlValue);
    }
  }

  @Input() withConfirm = false;
  @Input() label: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() seazoneControl = false;
  @Output() changed = new EventEmitter<boolean>(true);

  controlValue = false;

  @ViewChild('input', {static: true}) readonly inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
  ) {
    super();
  }

  stopPropagation(e: Event): void {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  handleClick(e: Event): void {
    if (this.disabled) {
      return;
    }
    const target = e.target as HTMLInputElement;
    if (!target) {
      return;
    }
    const newVal = !this.controlValue;
    this.changed.emit(newVal);
    if (this.withConfirm) {
      e.preventDefault();
      return;
    }
    this.controlValue = newVal;
    this.onChange();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  writeValue(value: boolean | null): void {
    this.controlValue = !!value;
    this.setInputValue(this.controlValue);
  }

  onTouched() {
    this.onTouchedFn();
  }

  onChange() {
    this.onChangeFn(this.controlValue);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  private onChangeFn = (value: boolean | null) => {
  };

  private onTouchedFn = () => {
  };

  private setInputValue(value: boolean): void {
    const input = this.inputRef && this.inputRef.nativeElement;
    if (!input) {
      return;
    }
    this.renderer.setProperty(input, 'checked', value);
  }
}
