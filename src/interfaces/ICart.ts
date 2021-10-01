import { IItem } from "./IItem";

export interface ICart {
  id: number;
  app_mode: string;
  status: string;
  created_at: string;
  items_count: number;
  total_price: number;
  total_price_without_discount: number;
  total_discount: number;
  items: Array<IItem> | null;
}