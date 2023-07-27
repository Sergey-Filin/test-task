import {InjectionToken} from '@angular/core';

export type ControlStatus = 'valid' | 'invalid';

export class CustomFormError {
  constructor(
    public readonly key: string,
    public readonly value?: string | null,
    public readonly translate = true,
  ) { }
}

export type CustomFormErrorFn = (value?: {[key: string]: string | number} | string | number | null) => CustomFormError;

export interface CustomFormErrors {
  [key: string]: CustomFormErrorFn;
}

export const defaultErrors: CustomFormErrors = {
  required: () => new CustomFormError('errors.required'),
  validEmail: () => new CustomFormError('errors.email'),
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  factory: () => defaultErrors,
});

