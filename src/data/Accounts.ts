import { sumBy } from "lodash";

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

export function getNetSummaryData(
  productData: ProductsData | undefined,
): Array<{ name: string; value: number }> {
  if (productData) {
    return Object.values(productData).flatMap((p) =>
      p.accounts.map((a) => ({
        name: createLabel(p.name, a.accountName, a.balance),
        value: a.balance,
      }))
    ).sort((a, b) => b.value - a.value);
  } else {
    return [];
  }
}

function createLabel(
  productName: string,
  accountName: string,
  value: number,
): string {
  return `${productName} ${filterNumbersAndDashes(accountName)} - $${value}`;
}

function filterNumbersAndDashes(str: string): string {
  return str.replace(/[\d-]/g, "");
}
