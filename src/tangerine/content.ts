import { Account } from "../data/Product";
import { ProductSummaryExtractor } from "../data/ProductSummaryExtractor";
import { querySelectNumber, querySelectText } from "../utils";

class TangerineAccountSummaryExtractor extends ProductSummaryExtractor {
  name = "Tangerine";

  extractAccountDetails(): Account[] {
    const accounts: Account[] = [];
    // Use document.querySelectorAll to select all account list items
    const tangerineAccounts = document.querySelector(".tangerine-accounts");
  const accountRows = tangerineAccounts?.querySelectorAll(".account-list .clickable-row") ?? [];
  
    accountRows.forEach((element) => {
      const accountName = querySelectText(element, '.account-nickname');
      const accountBalance = querySelectNumber(element, '.account-balance span:nth-child(2)');
  
      const account: Account = {
        accountName, // Directly using accountName
        balance: accountBalance,
        // Additional properties can be included as needed.
      };
  
      accounts.push(account);
    });
  
    return accounts;
  }
  
}

new TangerineAccountSummaryExtractor().onLoad()
