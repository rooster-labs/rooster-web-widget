import {
  AccountSummaryExtractor,
  ScrapedAccountData,
} from "../../common/data/accountSummary/AccountSummaryExtractor.js";
import { querySelectNumber, querySelectText } from "../../../utils.js";
import { findAccountType, isInvestmentAccount } from "../../common/data/accountSummary/accountClassifier.js";

class WealthSimpleAccountSummaryExtractor extends AccountSummaryExtractor {
  service_name = "WealthSimple";

  extractAccountDetails(): ScrapedAccountData[] {
    const accounts: ScrapedAccountData[] = [];
    const accountElements = document.querySelectorAll(
      ".sc-6e9df86d-0 .sc-4fb201c3-1",
    );

    accountElements.forEach((element) => {
      const account_name = querySelectText(element, ".sc-6e9df86d-0 .bTrgQn");
      const balance = querySelectNumber(element, ".sc-6e9df86d-0 .KjTSo");

      const account: ScrapedAccountData = {
        service_name: this.service_name,
        account_name,
        account_type: findAccountType(account_name),
        balance,
        is_investment: isInvestmentAccount(account_name)
        // Include additional properties as needed.
      } as ScrapedAccountData;

      accounts.push(account);
    });

    return accounts;
  }
}

new WealthSimpleAccountSummaryExtractor().onLoad(5000);
