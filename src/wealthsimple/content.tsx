import { Account } from "../data/Product";
import { ProductSummaryExtractor } from "../data/ProductSummaryExtractor";
import { querySelectText, querySelectNumber } from "../utils";

class WealthSimpleAccountSummaryExtractor extends ProductSummaryExtractor {
  name = "WealthSimple";

  extractAccountDetails(): Account[] {
    const accounts: Account[] = [];
    const accountElements = document.querySelectorAll('.sc-6e9df86d-0.sc-9ac2a8fd-1.itAfij.hrCMff');
  
    accountElements.forEach((element) => {
      const accountName = querySelectText(element, '.sc-6e9df86d-0 .hzocLA');
      const balance = querySelectNumber(element, '.sc-6e9df86d-0 .KjTSo');
  
      const account: Account = {
        accountName,
        balance,
        // Include additional properties as needed.
      };
  
      accounts.push(account);
    });
  
    return accounts;
  }
}

new WealthSimpleAccountSummaryExtractor().onLoad(5000)