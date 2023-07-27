import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskDropdownComponent } from './test-task-dropdown.component';

describe('TestTaskDropdownComponent', () => {
  let component: TestTaskDropdownComponent;
  let fixture: ComponentFixture<TestTaskDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTaskDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaskDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
