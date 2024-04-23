import { sumBy } from "lodash";
import { filterOutFiller } from "../utils.js";

// Interface representing a collection of products indexed by a string key.
export interface BusinessesData {
  [key: string]: Business; // Key-value pairs where the key is a string and the value is a Product.
}

// Interface for the structure of a Product.
export interface Business {
  name: string; // The name of the product.
  accounts: Account[]; // An array of Account objects associated with the product.
}

// Interface for the structure of an Account.
export interface Account {
  accountName: string; // The name of the account.
  types: Array<string>; // a list of types that help classify the kind of account
  balance: number; // The current balance of the account.
  pendingBalance?: number; // The pending balance of the account (optional).
  cash?: number; // The cash amount in the account (optional).
  marketValue?: number; // The market value of the account's holdings (optional).
  transactions?: Array<any>; // An array of transactions associated with the account (optional, type can be specified more explicitly than `any` if known).
}

// TODO: Create a deposit types Set. Then a seperate Map for type to classifier

const depositClassifier = new Set([
  "chequing",
  "crypto",
  "fhsa",
  "rrsp",
  "savings",
  "tfsa",
  "non-registered",
]);

const rrspClassifier = new Set(["rrsp", "rsp"]);

const creditClassifier = new Set([
  "credit card",
  "loan",
  "line of credit",
  "secured line of credit",
  "visa",
  "mastercard",
  "american express",
  "amex",
]);

const creditCardClassifier = new Set([
  "visa",
  "mastercard",
  "american express",
]);

export function findAllAccountType(accountName: string): string[] {
  const lowerCaseName = accountName.toLowerCase();
  const accountTypeList = new Array<string>();
  let isDeposit = false;

  depositClassifier.forEach((c) => {
    if (lowerCaseName.includes(c) || lowerCaseName.includes(c.toUpperCase())) {
      if (rrspClassifier.has(c)) {
        accountTypeList.push("rrsp");
      } else {
        accountTypeList.push(c);
      }
      isDeposit = true;
    }
  });

  if (lowerCaseName == "cash") {
    accountTypeList.push("chequing");
    isDeposit = true;
  }

  if (!isDeposit) {
    creditClassifier.forEach((c) => {
      if (
        lowerCaseName.includes(c) || lowerCaseName.includes(c.toUpperCase())
      ) {
        if (creditCardClassifier.has(c)) {
          accountTypeList.push("credit card");
        } else {
          accountTypeList.push(c);
        }
      }
    });
  }

  return accountTypeList;
}

/**
 * Calculates the total net worth based on the provided products data.
 *
 * @param productData - An optional ProductsData object containing information about various products and their accounts.
 * @returns The total net worth as a number. Returns 0 if no product data is provided.
 */
export function calcNetWorth(productData: BusinessesData | undefined): number {
  if (productData) {
    const productList = Object.values(productData);
    return sumBy(productList, (p) => sumBy(p.accounts, (a) => a.balance));
  } else {
    return 0;
  }
}

function getAllDepositAccounts(accounts: Account[]): Account[] {
  if (accounts) {
    return accounts.filter((a) =>
      a.types.length > 0 && depositClassifier.has(a.types[0])
    );
  } else {
    return [];
  }
}

/**
 * Generates a summary data array from the product data, containing labels and values for each account.
 *
 * @param productData - An optional ProductsData object containing information about various products and their accounts.
 * @returns An array of objects, each with a 'name' and 'value' property, representing each account. Sorted by value in descending order.
 */
export function getNetSummaryDataByAccount(
  productData: BusinessesData | undefined,
): Array<{ name: string; value: number }> {
  if (productData) {
    return Object.values(productData).flatMap((p) =>
      getAllDepositAccounts(p.accounts).map((a) => ({
        name: createLabel(p.name, a.accountName, a.balance),
        value: a.balance,
      }))
    ).sort((a, b) => b.value - a.value);
  } else {
    return [];
  }
}

export function getNetSummaryDataByType(
  productData: BusinessesData | undefined,
): Array<{ name: string; value: number }> {
  if (productData) {
    const depositAccounts = Object.values(productData).flatMap((p) =>
      getAllDepositAccounts(p.accounts)
    );
    const depositTypeToValue = new Map<string, number>();

    depositAccounts.forEach((a) => {
      const types = a.types;
      const t = types[0];
      const v = depositTypeToValue.get(t);

      if (v != undefined) {
        depositTypeToValue.set(t, v + a.balance);
      } else {
        depositTypeToValue.set(t, a.balance);
      }
    });

    return Array.from(depositTypeToValue).map(([n, value]) => ({
      name: createLabel(n.toUpperCase(), "", value),
      value,
    }));
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
  return `${productName} ${filterOutFiller(accountName)} - $${value}`;
}
