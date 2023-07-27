import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { HomeService } from "../services/home.service";
import { Currency, CurrencyI, GroupCurrency, SelectItem } from "../../../shared/models";
import { delay, map, Observable, of, switchMap } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import { DestroySubscription } from "@helpers/classes/destroy-subscription";
import { CalculateAction } from "../../../shared/static";
import { FormsModel } from "../../../shared/models/forms.model";
import { OverlayService } from "@modules/modal";
import { HomeNotificationComponent } from "./home-notification/home-notification.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends DestroySubscription implements OnInit {

  form: UntypedFormGroup;

  compareFn = (o1: SelectItem<number>, o2: SelectItem<number>): boolean => o1?.value === o2?.value;
  currencyList$: Observable<GroupCurrency>;

  selectedValue: CurrencyI;
  profit: string;
  percent: number;
  currencyList: CurrencyI[];
  periodList$: Observable<number[]>;
  amountCount = 1000;


  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  get currency(): AbstractControl {
    return this.form.get('currency');
  }

  get period(): AbstractControl {
    return this.form.get('period');
  }

  get search(): AbstractControl {
    return this.form.get('search');
  }

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly homeService: HomeService,
    private readonly cdr: ChangeDetectorRef,
    private readonly overlayService: OverlayService,
  ) {
    super();
    this.initForm();
  }

  ngOnInit():void {
    this.getCurrency();
    this.search.valueChanges.pipe(
      debounceTime(300),
      switchMap(vl => {
        const currencyList  = this.homeService.getCurrencyList(vl);
        if(currencyList.length){
          this.currencyList = currencyList;
        }
        this.cdr.detectChanges();
        return currencyList;
      }),
      takeUntil(this.destroyStream$)
    ).subscribe(console.log);


    this.form.valueChanges.pipe(
      takeUntil(this.destroyStream$)
    ).subscribe((vl: FormsModel) => {
      this.selectedValue = vl?.currency;
      this.amount.setValue(vl?.amount, { emitEvent: false })
      this.calculateProfit(vl?.currency?.value, vl?.period)
      this.cdr.detectChanges();
    });
  }

  private getCurrency(): void {
    this.currencyList = this.homeService.getCurrencyList();
    this.currency.setValue(this.currencyList[0]);
    this.periodList$ = this.homeService.getPeriodList().pipe(
      map(vl => {
        this.period.setValue(vl[0]);
        return vl;
      })
    );
    this.homeService.getPeriodList()
}

  calculate(action: CalculateAction.INC | CalculateAction.DEC): void {
    if(action === CalculateAction.INC && this.amount.value < 1000000) {
      this.amount.patchValue(parseInt(this.amount.value) + this.amountCount);
      this.calculateProfit();
    } else if(action === CalculateAction.DEC && this.amount.value > 1000) {
      this.amount.patchValue(parseInt(this.amount.value) - this.amountCount);
      this.calculateProfit();
    }
  }

  private calculateProfit(apr: number = this.currency.value.value, period:number = this.period.value):void {
    this.profit = new Intl.NumberFormat('en-US').format((this.amount.value * apr * (period*30)/ 365) /100);
    this.percent = apr;
    this.cdr.detectChanges();
  }


  private initForm(): void {
    const fb = this.fb;
    this.form = fb.group({
      amount: fb.control(1000),
      currency: fb.control(null),
      period: fb.control(null),
      search: fb.control(null),
    });
  }

  onOpenModal(event: UIEvent): void {
    this.modalNotification('MY NOTIFICATION MODAL');
  }

  modalNotification(data: string): void {
    this.overlayService.open(HomeNotificationComponent, data).afterClosed$.pipe(
      takeUntil(this.destroyStream$)
    ).subscribe(vl => console.log(vl))
  }

}
