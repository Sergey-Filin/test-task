import { CurrencyI } from "./currency.model";

export class FormsModel {
  constructor(
    readonly amount: number,
    readonly currency: CurrencyI,
    readonly period: number,
  ) {
  }
}

