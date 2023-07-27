import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskFormFieldComponent } from './test-task-form-field.component';

describe('TestTaskFormFieldComponent', () => {
  let component: TestTaskFormFieldComponent;
  let fixture: ComponentFixture<TestTaskFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTaskFormFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaskFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
