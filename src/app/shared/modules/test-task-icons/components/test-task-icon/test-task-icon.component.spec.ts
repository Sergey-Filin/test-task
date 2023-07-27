import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskIconComponent } from './test-task-icon.component';

describe('TestTaskIconComponent', () => {
  let component: TestTaskIconComponent;
  let fixture: ComponentFixture<TestTaskIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTaskIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaskIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
