import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskOptionComponent } from './test-task-option.component';

describe('TestTaskOptionComponent', () => {
  let component: TestTaskOptionComponent;
  let fixture: ComponentFixture<TestTaskOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTaskOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaskOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
