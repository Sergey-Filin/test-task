import {InjectionToken} from '@angular/core';

export interface TestTaskDropdownSettings {
  additionalClasses?: string[];
}

export const TEST_TASK_DROPDOWN = new InjectionToken('TestTaskDropdown', {
  factory: (): TestTaskDropdownSettings => ({}),
});
