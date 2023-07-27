export type FormFieldDirection = 'column' | 'row';

export interface TestTaskControlSettings {
  direction: FormFieldDirection;
  duplicateLabel: boolean;
  additionalClasses: string[];
}
