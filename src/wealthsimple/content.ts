import { Account, findAllAccountType } from "../data/Business.js";
import { ProductSummaryExtractor } from "../data/ProductSummaryExtractor.js";
import { querySelectNumber, querySelectText } from "../utils.js";

class WealthSimpleAccountSummaryExtractor extends ProductSummaryExtractor {
  name = "WealthSimple";

  extractAccountDetails(): Account[] {
    const accounts: Account[] = [];
    const accountElements = document.querySelectorAll(
      ".sc-6e9df86d-0.sc-9ac2a8fd-1.itAfij.hrCMff",
    );

    accountElements.forEach((element) => {
      const accountName = querySelectText(element, ".sc-6e9df86d-0 .bTrgQn");
      const balance = querySelectNumber(element, ".sc-6e9df86d-0 .KjTSo");

      const account: Account = {
        accountName,
        types: findAllAccountType(accountName),
        balance,
        // Include additional properties as needed.
      };

      accounts.push(account);
    });

    return accounts;
  }
}

new WealthSimpleAccountSummaryExtractor().onLoad(5000);
