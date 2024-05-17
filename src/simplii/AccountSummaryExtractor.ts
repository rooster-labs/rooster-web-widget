import {
  extractAccountValues,
  XPathMap,
} from "../content-scripts/ObjectScrapper.js";
import { Account, AccountDetails } from "../data/AccountSummaryData.js";
import { AccountSummaryExtractor } from "../data/AccountSummaryExtractor.js";

export class SimpliiAccountSummaryExtractor extends AccountSummaryExtractor {
  name = "Simplii";
  type = "Bank";

  extractAccountDetails(): Account[] {
    const accountSummaryList = accountSummaryXPaths.map((xMap) =>
      extractAccountValues(xMap)
    );

    return accountSummaryList;
  }
}

const accountSummaryXPaths: XPathMap<AccountDetails>[] = [
  {
    accountName:
      "/html/body/div[6]/div/div[2]/div[2]/main/div/div/div[2]/div[1]/div[3]/section/section[3]/div/div[1]/table/tbody/tr[2]/td[1]/div/a",
    balance:
      "/html/body/div[6]/div/div[2]/div[2]/main/div/div/div[2]/div[1]/div[3]/section/section[3]/div/div[1]/table/tbody/tr[2]/td[2]/span",
  },
  {
    accountName:
      "/html/body/div[6]/div/div[2]/div[2]/main/div/div/div[2]/div[1]/div[3]/section/section[3]/div/div[1]/table/tbody/tr[3]/td[1]/div/a",
    balance:
      "/html/body/div[6]/div/div[2]/div[2]/main/div/div/div[2]/div[1]/div[3]/section/section[3]/div/div[1]/table/tbody/tr[3]/td[2]/span",
  },
  {
    accountName:
      "/html/body/div[6]/div/div[2]/div[2]/main/div/div/div[2]/div[1]/div[3]/section/section[3]/div/div[2]/table/tbody/tr[2]/td[1]/div/a",
    balance:
      "/html/body/div[6]/div/div[2]/div[2]/main/div/div/div[2]/div[1]/div[3]/section/section[3]/div/div[2]/table/tbody/tr[2]/td[3]/span",
  },
];
