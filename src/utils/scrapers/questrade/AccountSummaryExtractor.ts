import { querySelectNumber, querySelectText } from "../../../utils.js";
import { findAccountType } from "../../common/data/accountSummary/accountClassifier.js";

import {
  AccountSummaryExtractor,
  ScrapedAccountData,
} from "../../common/data/accountSummary/AccountSummaryExtractor.js";

export class QuestradeAccountSummaryExtractor extends AccountSummaryExtractor {
  service_name = "Questrade";
  type = "Broker";

  extractAccountDetails(): ScrapedAccountData[] {
    const accountSummaryList: ScrapedAccountData[] = [];
    const activeAccountListDiv = document.querySelector(
      ".active-accounts-list",
    );
    const accountRows = activeAccountListDiv?.querySelectorAll(".account-row");

    accountRows?.forEach((row) => {
      const account_name = querySelectText(row, ".account-name");
      accountSummaryList.push({
        user_id: this.user_id,
        service_name: this.service_name,
        account_name,
        account_type: findAccountType(account_name),
        cash: querySelectNumber(row, ".col-cash div:nth-child(2)"),
        market_value: querySelectNumber(
          row,
          ".col-market-value div:nth-child(2)",
        ),
        balance: querySelectNumber(row, ".col-total-equity div:nth-child(2)"),
        is_investment: true
      } as ScrapedAccountData);
    });

    return accountSummaryList.filter((a) => a.account_name !== "All accounts");
  }
}
