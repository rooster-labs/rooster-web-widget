import { Account, AccountDetails, findAllAccountType } from "../data/AccountSummaryData.js";
import { stringMoneyToFloat } from "../utils.js";
import { getElementByXpath, getElementTextByXPath } from "./DOMUtils.js";


// A web scrapper consists of a URL and a list of data to extract
// 1. match webiste
// 2. Fetch data from each XPath
// 3. aggregate the data into Account Summary info

// Represents how a web scraper for an object is defined
export type XPathMap<T> = {
  [K in keyof T]: string; // Key represents the object property and key represents XPath string used to find value
};

export type ResultObj<T> = {
  [K in keyof T]: string;
};

export function extractObjectValues<T>(xMap: XPathMap<T>) {
  return Object.keys(xMap).reduce((resObj, key) => {
    const k = key as keyof T;
    resObj[k] = getElementTextByXPath(xMap[k])?.trim() ?? "";
    return resObj;
  }, {} as ResultObj<T>);
}

export function extractAccountValues(
  xMap: XPathMap<AccountDetails>,
): Account {
  const res = extractObjectValues(xMap);
  const accountDetails = new AccountDetails();

  for (const [k, v] of Object.entries(accountDetails)) {
    if (typeof v === "number") {
      accountDetails[k] = stringMoneyToFloat(res[k]);
    } else {
      accountDetails[k] = res[k];
    }
  }

  accountDetails.types = findAllAccountType(accountDetails.accountName);

  return accountDetails as Account;
}
