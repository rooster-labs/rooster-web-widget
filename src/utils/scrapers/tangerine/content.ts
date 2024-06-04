import {
  AccountSummaryExtractor,
  ScrapedAccountData,
} from "../../common/data/AccountSummaryExtractor.js";
import { querySelectNumber, querySelectText } from "../../../utils.js";
import { findAccountType } from "../../common/data/accountClassifier.js";

class TangerineAccountSummaryExtractor extends AccountSummaryExtractor {
  service_name = "Tangerine";

  extractAccountDetails(): ScrapedAccountData[] {
    const accounts: ScrapedAccountData[] = [];
    // Use document.querySelectorAll to select all account list items
    const tangerineAccounts = document.querySelector(".tangerine-accounts");
    const accountRows =
      tangerineAccounts?.querySelectorAll(".account-list .clickable-row") ?? [];

    accountRows.forEach((element) => {
      const account_name = querySelectText(element, ".account-nickname");
      const balance = querySelectNumber(
        element,
        ".account-balance span:nth-child(2)",
      );

      const account: ScrapedAccountData = {
        service_name: this.service_name,
        account_name, // Directly using accountName
        account_type: findAccountType(account_name),
        balance,
        // Additional properties can be included as needed.
      } as ScrapedAccountData;

      accounts.push(account);
    });

    return accounts;
  }
}

new TangerineAccountSummaryExtractor().onLoad();
