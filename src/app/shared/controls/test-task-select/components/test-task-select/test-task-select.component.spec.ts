import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskSelectComponent } from './test-task-select.component';

describe('TestTaskSelectComponent', () => {
  let component: TestTaskSelectComponent;
  let fixture: ComponentFixture<TestTaskSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTaskSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaskSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
