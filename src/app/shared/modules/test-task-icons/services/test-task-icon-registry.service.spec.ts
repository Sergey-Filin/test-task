import { TestBed } from '@angular/core/testing';

import { TestTaskIconRegistryService } from './test-task-icon-registry.service';

describe('TestTaskIconRegistryService', () => {
  let service: TestTaskIconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTaskIconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
