import { sumBy } from "lodash";

// Interface representing a collection of products indexed by a string key.
export interface ProductsData {
  [key: string]: Product; // Key-value pairs where the key is a string and the value is a Product.
}

// Interface for the structure of a Product.
export interface Product {
  name: string; // The name of the product.
  type: string; // The type/category of the product.
  accounts: Account[]; // An array of Account objects associated with the product.
}

// Interface for the structure of an Account.
export interface Account {
  accountName: string; // The name of the account.
  balance: number; // The current balance of the account.
  pendingBalance?: number; // The pending balance of the account (optional).
  cash?: number; // The cash amount in the account (optional).
  marketValue?: number; // The market value of the account's holdings (optional).
  transactions?: Array<any>; // An array of transactions associated with the account (optional, type can be specified more explicitly than `any` if known).
}

/**
 * Calculates the total net worth based on the provided products data.
 *
 * @param productData - An optional ProductsData object containing information about various products and their accounts.
 * @returns The total net worth as a number. Returns 0 if no product data is provided.
 */
export function calcNetWorth(productData: ProductsData | undefined): number {
  if (productData) {
    const productList = Object.values(productData);
    return sumBy(productList, (p) => sumBy(p.accounts, (a) => a.balance));
  } else {
    return 0;
  }
}

/**
 * Generates a summary data array from the product data, containing labels and values for each account.
 *
 * @param productData - An optional ProductsData object containing information about various products and their accounts.
 * @returns An array of objects, each with a 'name' and 'value' property, representing each account. Sorted by value in descending order.
 */
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

/**
 * Creates a label for an account using the product name, account name, and account value.
 *
 * @param productName - The name of the product.
 * @param accountName - The name of the account.
 * @param value - The value or balance of the account.
 * @returns A formatted string label for the account.
 */
function createLabel(
  productName: string,
  accountName: string,
  value: number,
): string {
  return `${productName} ${filterNumbersAndDashes(accountName)} - $${value}`;
}

/**
 * Filters out numbers and dashes from a string.
 *
 * @param str - The input string to be filtered.
 * @returns The filtered string with numbers and dashes removed.
 */
function filterNumbersAndDashes(str: string): string {
  return str.replace(/[\d-]/g, "");
}
