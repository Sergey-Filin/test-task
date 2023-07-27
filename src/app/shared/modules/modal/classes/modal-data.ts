import {InjectionToken} from '@angular/core';

import { TestTaskModalConfig } from "@modules/modal/interfaces/test-task-modal-config";

export const MODAL_DATA = new InjectionToken('ModalData');
export const MODAL_ADDITIONAL_CONFIG = new InjectionToken('ModalAdditionalConfig');
export const TEST_TASK_MODAL_CONFIG =  new InjectionToken<TestTaskModalConfig>('TestTaskModalConfig');
