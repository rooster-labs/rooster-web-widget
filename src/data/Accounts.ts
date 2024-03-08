import { sumBy } from "lodash";
import uniq from "lodash/uniq";

export interface ProductsData {
  [key: string]: Product;
}

export interface Product {
  name: string;
  type: string;
  accounts: Account[];
}

export interface Account {
  accountName: string;
  balance: number;
  pendingBalance?: number;
  cash?: number;
  marketValue?: number;
  transactions?: Array<any>;
}

export function calcNetWorth(productData: ProductsData | undefined): number {
  if (productData) {
    const productList = Object.values(productData);
    return sumBy(productList, (p) => sumBy(p.accounts, (a) => a.balance));
  } else {
    return 0;
  }
}
