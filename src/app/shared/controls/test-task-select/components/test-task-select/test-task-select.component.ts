import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChildren, ElementRef, EventEmitter,
  forwardRef,
  Input, NgZone,
  OnDestroy,
  OnInit, Output, QueryList, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormFieldHintPosition } from "../../../test-task-form-field/models/test-task form-field";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { NG_VALUE_ACCESSOR, UntypedFormControl } from "@angular/forms";
import { ControlStatus } from "../../../form-errors";
import { TestTaskSelectService } from "../../services/test-task-select.service";
import { ActiveDescendantKeyManager, FocusMonitor } from "@angular/cdk/a11y";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { TestTaskOptionComponent } from "../test-task-option/test-task-option.component";
import {
  TestTaskDropdownComponent
} from "../../../test-task-dropdown/components/test-task-dropdown/test-task-dropdown.component";
import {
  TestTaskFormFieldComponent
} from "../../../test-task-form-field/components/test-task-form-field/test-task-form-field.component";
import { distinctUntilChanged, startWith, Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-test-task-select',
  templateUrl: './test-task-select.component.html',
  styleUrls: ['./test-task-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestTaskSelectComponent),
      multi: true,
    },
    TestTaskSelectService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TestTaskSelectComponent<T = any> implements OnInit, AfterViewInit, OnDestroy {

  private selectedKey: T | T[];
  private selectionModel: TestTaskOptionComponent[] | TestTaskOptionComponent | null;
  private keyManager: ActiveDescendantKeyManager<TestTaskOptionComponent>;
  private readonly destroyStream$ = new Subject<void>();
  private isOptionsDisabled = false;

  value = '';
  status: ControlStatus = 'valid';
  filter: UntypedFormControl | null = null; isRequired = false;
  display: string | number = '';

  @Output() selectionChange = new EventEmitter<T>();

  @ViewChild('input') input: ElementRef;
  @ViewChild('dropdownComp', {static: true}) dropdown: TestTaskDropdownComponent;
  @ViewChild('dropDownContainer', {static: true}) dropDownContainer: TestTaskFormFieldComponent;
  @ViewChild('allSelectOption') allSelectOption: TestTaskOptionComponent;
  @ViewChild(CdkVirtualScrollViewport) scrollViewport: CdkVirtualScrollViewport;
  @ViewChild('selectInput', {static: true}) selectInput: ElementRef<HTMLElement>;
  @ViewChild('optionsContainer', {static: true}) optionsContainer: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  @ContentChildren(TestTaskOptionComponent, {descendants: true}) options: QueryList<TestTaskOptionComponent>;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = true;
  @Input() minWidth: number;
  @Input() outline = true;
  @Input() displayType: 'innerHTML' | 'text' | 'img' = 'text';
  @Input() allLabel: string | null = 'All';
  @Input() resetLabel: string | null = null;
  @Input() hint = null;
  @Input() hintPosition: FormFieldHintPosition = 'top';
  @Input() dropdownClass: string | null = null;
  @Input() searchLabel: string | null = '';
  @Input() searchAlgorithm: 'includes' | 'match' = 'match';
  @Input() multiple = false;
  @Input() maxCount: number | null = null;

  @Input()
  set required(isRequired: BooleanInput) {
    this.isRequired = coerceBooleanProperty(isRequired);
  }

  get required(): boolean {
    return this.isRequired;
  }

  @Input() set search(val: boolean | undefined) {
    if (!!val) {
      this.addFilterControl();
      return;
    }
    this.filter = null;
  }

  @Input()
  set selectedValue(value: T | T[]) {
    if (this.selectedKey !== value) {
      this.selectedKey = value;
      this.compareAndSelect();
    }
  }

  get selectedContent(): string {
    const selected = this.selected;
    if (Array.isArray(selected)) {
      return selected.map(item => item.displayedContent).join(', ');
    }
    return selected && selected.displayedContent || '';
  }

  private get displayedContent(): string | number {
    const selected = this.selected;
    if (Array.isArray(selected)) {
      return selected.map(item => item.display).join(', ');
    }
    return selected && selected.display || '';
  }

  private get isAllSelected(): boolean {
    return Array.isArray(this.selected) && this.selected.length === this.optionsArray.length;
  }

  private get allSelectOptionContent(): string {
    const option = this.allSelectOption;
    return option && option.displayedContent || 'All';
  }

  get selected(): TestTaskOptionComponent[] | TestTaskOptionComponent | null {
    return this.selectionModel || (this.multiple ? [] : null);
  }

  set selected(model: TestTaskOptionComponent[] | TestTaskOptionComponent | null) {
    this.selectionModel = model;
  }

  private get optionsArray(): TestTaskOptionComponent[] {
    const options = this.options;
    if (!options) {
      return [];
    }
    return options.toArray();
  }

  get selectedValues(): any {
    const selected = this.selected;
    if (Array.isArray(selected)) {
      return selected.map(item => item.value);
    }
    return selected && selected.value;
  }

  get selectedOption(): TestTaskOptionComponent | null {
    const model = this.selectionModel;
    if (Array.isArray(model)) {
      return this.optionsArray.find(option => model.some(v => v.value === option.value)) || null;
    }
    return model || null;
  }

  private compareWithFn = (o1: any, o2: any): boolean => o1 === o2;

  @Input()
  get compareWith() {
    return this.compareWithFn;
  }

  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      return;
    }
    this.compareWithFn = fn;
  }

  onChangeFn = (_: any) => {
  };
  onTouchedFn = () => {
  };

  constructor(
    private readonly testTaskSelectService: TestTaskSelectService,
    private readonly cdr: ChangeDetectorRef,
    private readonly focusMonitor: FocusMonitor,
    private readonly zone: NgZone,
  ) {
    this.testTaskSelectService.register(this);
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.selectInput).pipe(
      takeUntil(this.destroyStream$),
    ).subscribe(origin => {
      this.zone.run(() => {
        if (this.dropdown.showing && !!origin) {
          this.hideDropdown();
        }
        this.dropDownContainer.setActiveState(!!origin);
      });
    });
  }

  ngAfterViewInit() {
    const options = this.options;
    this.initKeyManager(options);
    options.changes.pipe(
      startWith(options),
      takeUntil(this.destroyStream$),
    ).subscribe(() => {
      this.compareAndSelect();
    });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.selectInput);
    const destroy = this.destroyStream$;
    destroy.next();
    destroy.unsubscribe();
    this.cdr.detach();
  }

  setSelectedOption(option: TestTaskOptionComponent): void {
    this.updateSelectionModel(option);
    this.keyManager.setActiveItem(option);
    if (!this.multiple) {
      this.hideDropdown();
    }
    this.checkMaxCount();
    this.onTouched();
  }

  private checkMaxCount(): void {
    if (!this.multiple) {
      return;
    }

    const maxCount = this.maxCount;
    if (!maxCount) {
      return;
    }

    const selectedValues = this.selectedValues;
    if (selectedValues.length >= maxCount) {
      this.isOptionsDisabled = true;
      this.options.forEach(opt => {
        if (!opt.selected) {
          opt.setDisabledState(true);
        }
      });
      return;
    }

    if (!this.isOptionsDisabled) {
      return;
    }
    this.options.forEach(opt => {
      opt.setDisabledState(false);
    });
    this.isOptionsDisabled = false;
  }

  onChangeStatus(event: ControlStatus): void {
    if (this.status !== event) {
      this.status = event;
    }
  }

  private updateSelectionModel(option: TestTaskOptionComponent, emitEvent = true): void {
    const selected = this.selected;
    if (option.value === 'all') {
      const status = option.selectedOption;
      this.allSelectOption.active = true;
      this.updateSelection(status);
      this.value = option.selectedOption ? option.displayedContent : '';
    } else {
      this.selected = this.multiple && Array.isArray(selected) ? this.updateOptions(option, selected) : option;
      this.value = this.isAllSelected ? this.allSelectOptionContent : this.selectedContent;
      this.display = this.displayedContent || '';
    }
    if (this.selectedKey !== option.value) {
      this.selectedKey = option.value;
      this.selectionChange.emit(option.value);
    }
    if (emitEvent) {
      this.onChange();
    }
    this.cdr.detectChanges();
  }

  private updateOptions(option: TestTaskOptionComponent, options: TestTaskOptionComponent[]): TestTaskOptionComponent[] {
    const index = options.findIndex(item => item.value === option.value);
    index >= 0 ? options.splice(index, 1) : options.push(option);
    const isAllSelected = options.length === this.optionsArray.length;
    const allOption = this.allSelectOption;
    if (allOption) {
      allOption.selectedOption = !!isAllSelected;
    }
    return [...options];
  }

  private updateSelection(status: boolean): void {
    const options = this.optionsArray.map(option => {
      option.selectedOption = status;
      return option;
    });
    this.selected = !status ? [] : options;
  }

  private initKeyManager(options: QueryList<TestTaskOptionComponent>): void {
    this.keyManager = new ActiveDescendantKeyManager(options)
      .withHorizontalOrientation('ltr')
      .withVerticalOrientation()
      .withWrap();
      //.withTypeAhead();  //todo
  }

  showDropdown(event: MouseEvent | null = null) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!this.options.length || this.disabled) {
      return;
    }
    this.dropdown.show();
    if (this.filter) {
      this.searchInput?.nativeElement?.focus();
    }
    const option = this.selectedOption;
    this.setOptionListPosition(option);
    const keyManager = this.keyManager;
    option ? keyManager.setActiveItem(option) : keyManager.setFirstItemActive();
  }

  private setOptionListPosition(option: TestTaskOptionComponent | null) {
    const active = this.optionsContainer.nativeElement.querySelector('.selected') as HTMLElement;
    const search = this.optionsContainer.nativeElement.querySelector('.search') as HTMLElement;
    const searchHeight = active && search ? search.offsetHeight : 0;
    const top = active ? active.offsetTop : 0;
    this.optionsContainer.nativeElement.scrollTop = option ? top - searchHeight : 0;
  }

  hideDropdown(): void {
    this.dropdown.hide();
  }

  onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const activeItem = this.keyManager.activeItem;
      if (activeItem) {
        this.setSelectedOption(activeItem);
      }
      this.hideDropdown();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.hideDropdown();
    }
  }

  writeValue(value: T | T[]): void {
    this.selectedKey = value;
    this.compareAndSelect();
  }

  private compareAndSelect(): void {
    const key = this.selectedKey;
    if (key === null || key === undefined) {
      const allOption = this.allSelectOption;
      if (allOption) {
        allOption.selectedOption = false;
      }
      this.value = '';
      this.updateSelection(false);
      this.cdr.detectChanges();
      return;
    }
    const selected = Array.isArray(key) ? this.filterSelectedOptions(key) : this.findSelectedOption(key);
    if (!selected) {
      this.value = '';
      this.selected = null;
      this.cdr.detectChanges();
      return;
    }
    if (Array.isArray(selected)) {
      const options = this.options;
      if (!options) {
        return;
      }
      options.forEach(opt => {
        opt.selectedOption = selected.some(s => s.value === opt.value);
      });
      this.selected = options.filter(opt => opt.selectedOption);
      const isAllSelected = this.selected.length === this.optionsArray.length;
      const allOption = this.allSelectOption;
      if (allOption) {
        allOption.selectedOption = isAllSelected;
      }
      this.value = this.isAllSelected ? this.allSelectOptionContent : this.selectedContent;
      this.display = this.displayedContent || '';
      this.checkMaxCount();
      this.cdr.detectChanges();
      return;
    }
    this.updateSelectionModel(selected, false);
    this.cdr.detectChanges();
  }

  private findSelectedOption(value: T): TestTaskOptionComponent | null {
    return this.optionsArray.find(option => option.value !== null && this.compareWithFn(option.value, value)) || null;
  }

  private filterSelectedOptions(values: T[]): TestTaskOptionComponent[] {
    return this.optionsArray.filter(option =>
      // return option.value !== null && values.includes(option.value);
      option.value !== null && values.find(item => this.compareWithFn(option.value, item)),
    );
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  onTouched() {
    this.onTouchedFn();
  }

  onChange() {
    this.onChangeFn(this.selectedValues);
  }

  private addFilterControl(): void {
    this.filter = new UntypedFormControl('');
    this.onFilterControlChanges();
  }

  private onFilterControlChanges(): void {
    const control = this.filter;
    if (!control) {
      return;
    }
    control.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroyStream$),
      ).subscribe(term => {
      const searchValue = term.trim().toLowerCase();
      this.options.forEach(opt => {
        const optContent = opt.displayedContent.toLowerCase().trim();
        const isMatch = this.searchAlgorithm === 'match' ?
          optContent.startsWith(searchValue) :
          optContent.includes(searchValue);
        opt.setHiddenStyles(!isMatch);
      });
      this.cdr.detectChanges();
    });
  }

}
