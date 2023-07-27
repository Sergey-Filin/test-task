export interface CurrencyI {
  title: string;
  value: number;
}

export class GroupCurrency {
  constructor(
    readonly currency: CurrencyI[],
    readonly period: number[]
  ) {
  }
}

export class Currency<T> {
  constructor(
    readonly title: string,
    readonly value: number
  ) {
  }
}

export class SelectItem<T> extends Currency<T> {
  constructor(
    item: Currency<T>,
    public readonly isUsed = false,
  ) {
    super(item.title, item.value);
  }
}
