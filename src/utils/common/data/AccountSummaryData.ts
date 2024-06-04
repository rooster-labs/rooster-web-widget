import { groupBy, has, sumBy } from "lodash";
import { filterOutFiller } from "../../../utils.js";
import { ScrapedAccountData } from "./AccountSummaryExtractor.js";
import { depositTypesClassifier } from "./accountClassifier.js";

// // Interface representing a collection of products indexed by a string key.
// export interface AccountSummaryData {
//   [key: string]: AccountSummary; // Key-value pairs where the key is a string and the value is a Product.
// }

// // Interface for the structure of a Business.
// export interface AccountSummary {
//   businessName: string; // The name of the Business.
//   accounts: Account[]; // An array of Account objects associated with the product.
// }

// // Interface for the structure of an Account.
// export interface Account {
//   accountName: string; // The name of the account.
//   types: Array<string>; // a list of types that help classify the kind of account
//   balance: number; // The current balance of the account.
//   pendingBalance?: number; // The pending balance of the account (optional).
//   cash?: number; // The cash amount in the account (optional).
//   marketValue?: number; // The market value of the account's holdings (optional).
//   transactions?: Array<object>; // An array of transactions associated with the account (optional, type can be specified more explicitly than `any` if known).
// }

// TODO: Create a deposit types Set. Then a seperate Map for type to classifier

// const depositClassifier = new Set([
//   "chequing",
//   "crypto",
//   "fhsa",
//   "rrsp",
//   "rsp",
//   "savings",
//   "tfsa",
//   "non-registered",
// ]);

// const rrspClassifier = new Set(["rrsp", "rsp"]);

// const creditClassifier = new Set([
//   "credit card",
//   "loan",
//   "line of credit",
//   "secured line of credit",
//   "visa",
//   "mastercard",
//   "american express",
//   "amex",
// ]);

// const creditCardClassifier = new Set([
//   "visa",
//   "mastercard",
//   "american express",
// ]);

// export function findAllAccountType(accountName: string): string[] {
//   const lowerCaseName = accountName.toLowerCase();
//   const accountTypeList = new Array<string>();
//   let isDeposit = false;

//   depositClassifier.forEach((c) => {
//     if (lowerCaseName.includes(c)) {
//       if (rrspClassifier.has(c)) {
//         accountTypeList.push("rrsp");
//       } else {
//         accountTypeList.push(c);
//       }
//       isDeposit = true;
//     }
//   });

//   if (lowerCaseName == "cash") {
//     accountTypeList.push("chequing");
//     isDeposit = true;
//   }

//   if (!isDeposit) {
//     creditClassifier.forEach((c) => {
//       if (lowerCaseName.includes(c)) {
//         if (creditCardClassifier.has(c)) {
//           accountTypeList.push("credit card");
//         } else {
//           accountTypeList.push(c);
//         }
//       }
//     });
//   }

//   return accountTypeList;
// }

/**
 * Calculates the total net worth based on the provided products data.
 *
 * @param data - An optional ProductsData object containing information about various products and their accounts.
 * @returns The total net worth as a number. Returns 0 if no product data is provided.
 */
export function calcNetWorth(
  data: ScrapedAccountData[] | undefined,
): number {
  if (data) {
    return sumBy(
      data,
      (a) =>
        has(depositTypesClassifier, a.account_type ?? "") ? a.balance ?? 0 : 0,
    );
  } else {
    return 0;
  }
}

function getAllDepositAccounts(
  accounts: ScrapedAccountData[],
): ScrapedAccountData[] {
  if (accounts) {
    return accounts.filter(
      (a) => has(depositTypesClassifier, a.account_type ?? ""),
    );
  } else {
    return [];
  }
}

/**
 * Generates a summary data array from the product data, containing labels and values for each account.
 *
 * @param data - An optional ProductsData object containing information about various products and their accounts.
 * @returns An array of objects, each with a 'name' and 'value' property, representing each account. Sorted by value in descending order.
 */
export function getNetSummaryDataByAccount(
  data: ScrapedAccountData[] | undefined,
): Array<{ name: string; value: number }> {
  if (data) {
    return data.map((a) => {
      return {
        name: createLabel(
          a.service_name ?? "",
          a.account_name ?? "",
          a.balance ?? 0,
        ),
        value: a.balance ?? 0,
      };
    });
  } else {
    return [];
  }
}

export function getNetSummaryDataByType(
  data: ScrapedAccountData[] | undefined,
): Array<{ name: string; value: number }> {
  if (data) {
    const accountsByType = groupBy(data, "account_type");
    
    return Object.entries(accountsByType).map((entry) => {
      const total = sumBy(entry[1], (v) => v.balance ?? 0);

      return {
        name: createLabel(entry[0].toUpperCase(), "", total),
        value: total,
      };
    });
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
