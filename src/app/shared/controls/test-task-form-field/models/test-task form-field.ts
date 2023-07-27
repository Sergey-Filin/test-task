import { Input, Directive } from '@angular/core';

export type FormFieldHintPosition = 'top' | 'bottom';

export interface TestTaskFormFieldI {
  label: string | null;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  large: boolean;
  hint: string | null;
  hintPosition: FormFieldHintPosition;
}

@Directive()
export class TestTaskFormField implements TestTaskFormFieldI {
  @Input() label: string | null = null;
  @Input() required = false;
  @Input() readonly = false;
  @Input() large = false;
  @Input() disabled = false;
  @Input() hint = null;
  @Input() hintPosition: FormFieldHintPosition = 'top';
}
