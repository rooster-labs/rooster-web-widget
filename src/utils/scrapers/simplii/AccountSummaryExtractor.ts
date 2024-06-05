import {
  AccountSummaryExtractor,
  ScrapedAccountData,
} from "../../common/data/accountSummary/AccountSummaryExtractor.js";
import { querySelectNumber, querySelectText } from "../../../utils.js";
import {
  findAccountType,
  isInvestmentAccount,
} from "../../common/data/accountSummary/accountClassifier.js";

export class SimpliiAccountSummaryExtractor extends AccountSummaryExtractor {
  service_name = "Simplii";

  extractAccountDetails(): ScrapedAccountData[] {
    const accountSummaryList = new Array<ScrapedAccountData>();
    const allAccounts = [
      document.querySelectorAll(".items__list table.DEPOSIT tr.ember-view"),
      document.querySelectorAll(".items__list table.CREDIT tr.ember-view"),
    ];

    allAccounts.forEach((account) =>
      account?.forEach((row) => {
        const accountName = querySelectText(row, ".account-name");
        if (accountName != "") {
          accountSummaryList.push({
            service_name: this.service_name,
            account_name: querySelectText(row, ".account-name"),
            account_type: findAccountType(accountName),
            balance: querySelectNumber(row, ".balance"),
            cash: null,
            is_investment: isInvestmentAccount(accountName),
            market_value: null,
            net_deposit: null,
            pending_balance: null,
            user_id: null,
          });
        }
      })
    );

    return accountSummaryList;
  }
}
