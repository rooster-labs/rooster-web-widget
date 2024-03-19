import { Account } from "../data/Product";
import { ProductSummaryExtractor } from "../data/ProductSummaryExtractor";
import { querySelectNumber, querySelectText } from "../utils";

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
            balance: querySelectNumber(row, ".balance"),
          });
        }
      })
    );

    return accountSummaryList;
  }
}
