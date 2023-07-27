import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, EventEmitter,
  forwardRef, Input, Output, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CalculateAction } from "../../../../static";

export type InputType = 'text' | 'number';


@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor {

  value: string;
  calculateAction = CalculateAction;

  @Input() amount = false;
  @Input() readonly = true;
  @Input() type: InputType = 'number';
  @Input() minMax = false;

  @Output() isChangeable = new EventEmitter<any>();

  @ViewChild('formInput', {static: true}) formInput: HTMLInputElement;

  private onChangeFn = (value: any) => {
  }
  private onTouchedFn = () => {
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public onChangeValue(event: any): void {
    const value = event.target && event.target.value;
    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public writeValue(value: string): void {
    if (!value) {
      this.value = '1000';
    }
    this.value = value;
  }

  public onTouched(): void {
    this.onTouchedFn();
  }

  public onChange(value): void {
    this.onChangeFn(value);
    this.cdr.detectChanges();
  }

  calculate(action: CalculateAction.INC | CalculateAction.DEC):void {
    this.isChangeable.emit(action);
  }
}
