import {
  Account,
  AccountSummary,
} from "./AccountSummaryData.js";
import { ls } from "./localStorage.js";

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
      ls.updateAccountSummary(accountSummary);
      console.log(`${this.name} Summary Page`, { accountSummary });
    }, timeout);
  }
}
