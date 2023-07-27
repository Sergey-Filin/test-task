import { TestBed } from '@angular/core/testing';

import { TestTaskSelectService } from './test-task-select.service';

describe('TestTaskSelectService', () => {
  let service: TestTaskSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTaskSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
