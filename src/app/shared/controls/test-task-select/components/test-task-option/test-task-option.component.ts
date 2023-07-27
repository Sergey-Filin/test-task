import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding, HostListener,
  Input,
  ViewChild
} from '@angular/core';
import { Highlightable } from "@angular/cdk/a11y";
import { TestTaskSelectComponent } from "../test-task-select/test-task-select.component";
import { TestTaskSelectService } from "../../services/test-task-select.service";

@Component({
  selector: 'app-test-task-option',
  templateUrl: './test-task-option.component.html',
  styleUrls: ['./test-task-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTaskOptionComponent implements AfterViewInit, Highlightable {

  displayedContent: string;
  multiple = false;
  selectedOption = false;
  private select: TestTaskSelectComponent;

  @Input() value: any;
  @Input() display: string | number = '';
  @Input() notSelectable = false;
  @Input() isSelected = false;
  @Input() disabled = false;

  @ViewChild('option') option: ElementRef<HTMLElement>;

  @HostBinding('class.active') active = false;
  @HostBinding('class') theme = 'select-option-wrap';

  @HostBinding('class.selected')
  get selected(): boolean {
    const selected = this.select.selected;
    if (Array.isArray(selected)) {
      return selected.findIndex(option => option === this) >= 0;
    }
    return selected === this || this.isSelected;
  }

  @HostBinding('class.disabled')
  get disableState(): boolean {
    return this.disabled;
  }

  @HostBinding('class.test-task-option') hostClass = true;

  constructor(
    private readonly selectService: TestTaskSelectService,
    public readonly elRef: ElementRef<HTMLElement>,
  ) {
    this.select = this.selectService.getSelect();
  }

  ngAfterViewInit(): void {
    this.multiple = this.select.multiple;
    this.setDisplayedValue();
  }

  private setDisplayedValue(): void {
    const option = this.option;
    const nativeElement = option && option.nativeElement;
    const innerText = nativeElement && nativeElement.innerText;
    this.displayedContent = this.display ? `${this.display}` : innerText && innerText.trim();
  }

  getLabel(): string {
    return this.value;
  }

  setActiveStyles(): void {
    this.active = true;
  }

  setInactiveStyles(): void {
    this.active = false;
  }

  setHiddenStyles(val: boolean): void {
    const ref = this.elRef.nativeElement;
    if (!ref) {
      return;
    }
    if (val) {
      ref.classList.add('hidden-option');
      return;
    }
    ref.classList.remove('hidden-option');
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('click', ['$event'])
  onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.selectedOption = !this.selectedOption;

    if (!this.notSelectable) {
      this.select.setSelectedOption(this);
    }
  }
}
