import { Money } from "./common";

export interface Award {
  id: number;
  title: string;
  cost: Money;
  imageUrl: string;
}
