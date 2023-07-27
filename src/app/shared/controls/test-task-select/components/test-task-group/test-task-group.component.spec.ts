import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskGroupComponent } from './test-task-group.component';

describe('TestTaskGroupComponent', () => {
  let component: TestTaskGroupComponent;
  let fixture: ComponentFixture<TestTaskGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTaskGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaskGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
