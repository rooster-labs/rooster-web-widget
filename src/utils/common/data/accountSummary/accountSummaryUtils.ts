import { groupBy, has, sumBy } from "lodash";
import { filterOutFiller } from "../../../../utils.js";
import { ScrapedAccountData } from "./AccountSummaryExtractor.js";
import { depositTypesClassifier } from "./accountClassifier.js";

/**
 * Creates a label for an account using the product name, account name, and account value.
 *
 * @param serviceName - The name of the product.
 * @param accountName - The name of the account.
 * @param value - The value or balance of the account.
 * @returns A formatted string label for the account.
 */
function createLabel(
  serviceName: string,
  accountName: string,
  value: number,
): string {
  return `${serviceName} ${filterOutFiller(accountName)} - $${value}`;
}

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
