import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, EventEmitter, Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TestTaskFormField } from "../../models/test-task form-field";
import { TEST_TASK_CONTROL_CONFIG } from "../../../shared";
import { TestTaskControlSettings } from "../../../shared/models/control-settings";
import { ControlStatus } from "../../../form-errors";

@Component({
  selector: 'app-test-task-form-field',
  templateUrl: './test-task-form-field.component.html',
  styleUrls: ['./test-task-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTaskFormFieldComponent extends TestTaskFormField implements OnInit, OnChanges {

  nativeElement: any;
  active = false;
  wrapperStyling: string[] = [];
  @Input() outline = true;
  @Input() cursor: 'auto' | 'pointer' | 'default' | 'text' = 'auto';
  @Input() status: ControlStatus = 'valid';
  @Input() isTextArea = false;
  @Output() containerClick = new EventEmitter<MouseEvent>();
  @Output() contentClick = new EventEmitter<MouseEvent>();

  @ViewChild('formFieldContent', {static: true}) formFieldContent: ElementRef<HTMLElement>;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef,
    @Inject(TEST_TASK_CONTROL_CONFIG) public readonly testTaskFormField: TestTaskControlSettings,
  ) {
    super();
    this.nativeElement = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('status' in changes) {
      this.updateStyling();
    }
  }

  ngOnInit(): void {
    this.updateStyling();
  }

  onContainerClick(event: MouseEvent): void {
    event.preventDefault();
    // event.stopPropagation();
    this.containerClick.emit(event);
  }

  onContentClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.contentClick.emit(event);
  }

  setActiveState(active: boolean): void {
    this.active = active;
    this.cdr.detectChanges();
  }

  private updateStyling(): void {
    const classList: string[] = [];
    const settings = this.testTaskFormField;
    if (this.status === 'invalid') {
      classList.push('invalid');
    }
    if (this.isTextArea) {
      classList.push('form-field__area');
    }
    if (settings.direction === 'row') {
      classList.push('form-field--wrapper__row');
    }
    this.wrapperStyling = [...classList, ...settings.additionalClasses || ''];
  }
}
