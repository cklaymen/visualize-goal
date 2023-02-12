import { Money, Percentage } from "./common";

export interface IncomeSettings {
  hourlyRate: Money;
  tax: Percentage;
}
