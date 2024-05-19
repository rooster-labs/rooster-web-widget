import {
  Account,
  AccountSummary,
  updateAccountSummary,
} from "./AccountSummaryData.js";

export abstract class AccountSummaryExtractor {
  abstract name: string;

  abstract extractAccountDetails(): Account[];

  createSummary(): AccountSummary {
    return {
      businessName: this.name,
      accounts: this.extractAccountDetails(),
    };
  }

  onLoad(timeout: number = 4000) {
    setTimeout(() => {
      const accountSummary = this.createSummary();
      updateAccountSummary(accountSummary);
      console.log(`${this.name} Summary Page`, { accountSummary });
    }, timeout);
  }
}
