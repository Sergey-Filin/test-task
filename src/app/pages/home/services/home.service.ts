import { Injectable } from '@angular/core';
import { find, map, Observable, of, tap } from "rxjs";
import { CurrencyI} from "../../../shared/models";
import { CURRENCY_LIST} from "../../../mock";

@Injectable()
export class HomeService {

  private currencyList$: Observable<CurrencyI[]> = of(CURRENCY_LIST);
  private periodList$: Observable<number[]> = of([1,3,6,12,24]);

  constructor() { }

  getCurrencyList(dataSearch?: string): CurrencyI[] {
    const p =  CURRENCY_LIST.filter(vl => vl.title.indexOf(dataSearch) > -1);
    return dataSearch ? p :  CURRENCY_LIST;
  }

  getPeriodList(): Observable<number[]>{
    return this.periodList$.pipe(
      map(data => data)
    )
  }
}
