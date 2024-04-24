import { Account, AccountSummary } from "./AccountSummaryData.js";

export abstract class AccountSummaryExtractor {
  abstract name: string;

  abstract extractAccountDetails(): Account[];

  createProduct(): AccountSummary {
    return {
      businessName: this.name,
      accounts: this.extractAccountDetails(),
    };
  }

  onLoad(timeout: number = 4000) {
    setTimeout(() => {
      console.log(`${this.name} Summary Page`);
      const productData = this.createProduct();
      chrome.storage.local.set({ [this.name]: productData });
      console.log(productData);
    }, timeout);
  }
}
