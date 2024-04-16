import { Account, findAllAccountType } from "../data/Business.js";
import { ProductSummaryExtractor } from "../data/ProductSummaryExtractor.js";
import { querySelectNumber, querySelectText } from "../utils.js";

export class SimpliiAccountSummaryExtractor extends ProductSummaryExtractor {
  name = "Simplii";
  type = "Bank";

  extractAccountDetails(): Account[] {
    const accountSummaryList = new Array<Account>();
    const allAccounts = [
      document.querySelectorAll(".items__list table.DEPOSIT tr.ember-view"),
      document.querySelectorAll(".items__list table.CREDIT tr.ember-view"),
    ];

    allAccounts.forEach((account) =>
      account?.forEach((row) => {
        const accountName = querySelectText(row, ".account-name");
        if (accountName != "") {
          accountSummaryList.push({
            accountName: querySelectText(row, ".account-name"),
            types: findAllAccountType(accountName),
            balance: querySelectNumber(row, ".balance"),
          });
        }
      })
    );

    return accountSummaryList;
  }
}
