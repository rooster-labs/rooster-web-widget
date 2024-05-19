import {
  Account,
  findAllAccountType,
} from "../../common/data/AccountSummaryData.js";
import { AccountSummaryExtractor } from "../../common/data/AccountSummaryExtractor.js";
import { querySelectNumber, querySelectText } from "../../../utils.js";

class TangerineAccountSummaryExtractor extends AccountSummaryExtractor {
  name = "Tangerine";

  extractAccountDetails(): Account[] {
    const accounts: Account[] = [];
    // Use document.querySelectorAll to select all account list items
    const tangerineAccounts = document.querySelector(".tangerine-accounts");
    const accountRows =
      tangerineAccounts?.querySelectorAll(".account-list .clickable-row") ?? [];

    accountRows.forEach((element) => {
      const accountName = querySelectText(element, ".account-nickname");
      const balance = querySelectNumber(
        element,
        ".account-balance span:nth-child(2)",
      );

      const account: Account = {
        accountName, // Directly using accountName
        types: findAllAccountType(accountName),
        balance,
        // Additional properties can be included as needed.
      };

      accounts.push(account);
    });

    return accounts;
  }
}

new TangerineAccountSummaryExtractor().onLoad();
