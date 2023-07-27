import { InjectionToken } from "@angular/core";
import { TestTaskControlSettings } from "../models/control-settings";

export const TEST_TASK_CONTROL_CONFIG = new InjectionToken('TestTaskFormField', {
  factory: (): TestTaskControlSettings => TEST_TASK_COLUMN_CONTROL_CONFIG,
});

export const TEST_TASK_COLUMN_CONTROL_CONFIG: TestTaskControlSettings = {
  direction: 'column',
  duplicateLabel: true,
  additionalClasses: [],
};
