import { querySelectNumber, querySelectText } from "../utils";
import { Account, findAllAccountType } from "../data/Business";
import { ProductSummaryExtractor } from "../data/ProductSummaryExtractor";

export class QuestradeAccountSummaryExtractor extends ProductSummaryExtractor {
  name = "Questrade";
  type = "Broker";

  extractAccountDetails(): Account[] {
    const accountSummaryList: Account[] = [];
    const activeAccountListDiv = document.querySelector(
      ".active-accounts-list",
    );
    const accountRows = activeAccountListDiv?.querySelectorAll(".account-row");

    accountRows?.forEach((row) => {
      const accountName = querySelectText(row, ".account-name");
      accountSummaryList.push({
        accountName,
        types: findAllAccountType(accountName),
        cash: querySelectNumber(row, ".col-cash div:nth-child(2)"),
        marketValue: querySelectNumber(
          row,
          ".col-market-value div:nth-child(2)",
        ),
        balance: querySelectNumber(row, ".col-total-equity div:nth-child(2)"),
      });
    });

    return accountSummaryList.filter((a) => a.accountName !== "All accounts");
  }
}
