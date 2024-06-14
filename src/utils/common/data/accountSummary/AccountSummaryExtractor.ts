import {
  AccountData,
  accountDataToLogAccountArgs,
  accountSummaryService,
} from "../../apis/accountSummaryService.js";
import { ls } from "../localStorage.js";

export type ScrapedAccountData = Omit<
  AccountData,
  "account_id" | "created_at"
  >;

async function logScrapedAccountData(data: ScrapedAccountData[]) {

  data.forEach((a) => {
    const logAccountArgs = accountDataToLogAccountArgs(a as AccountData);
    accountSummaryService.rpc("log_account_data", logAccountArgs).then((res) =>
      console.log("Logging accountData:", res.data)
    );
  });
}

export abstract class AccountSummaryExtractor {
  abstract service_name: string;
  user_id: string = "";

  constructor() {
    this.initUserId();
  }

  async initUserId() {
    const userInfo = await ls.getUserInfo();
    this.user_id = userInfo.user_id;
  }

  abstract extractAccountDetails(): ScrapedAccountData[];

  isScrapedDataValid(a: ScrapedAccountData) {
    const isServiceNameValid = a.service_name && a.service_name != "";
    const isAccountNameValid = a.account_name && a.account_name != "";
    const isBalanceValid = a.balance != undefined;
    const isAccountTypeValid = a.account_type != undefined;
    return isServiceNameValid && isAccountNameValid && isBalanceValid &&
      isAccountTypeValid;
  }

  cleanAndValidateData(data: ScrapedAccountData[]) {
    const cleanedData = data.filter((a) => a.account_name !== "");
    const isValid = cleanedData.every((a) => this.isScrapedDataValid(a));
    if (isValid) {
      return cleanedData;
    } else {
      console.error(`${this.service_name} Summary Page data is not valid`, {
        data,
      });
      return [];
    }
  }

  onLoad(timeout: number = 4000) {
    setTimeout(() => {
      const accountSummary = this.extractAccountDetails();
      const cleanAccountSummary = this.cleanAndValidateData(accountSummary);
      ls.updateAccountDataForService(cleanAccountSummary);
      logScrapedAccountData(cleanAccountSummary)
      console.log(`${this.service_name} Summary Page`, { cleanAccountSummary });
    }, timeout);
  }
}

// scrap data from web
// create a list of account data
// store data in backend -> data will get account_ids
// pull latest data and update local -> with account_ids

// scrap data from web
// create a list of account data
// push into local storage -> with no account_ids
// then store data in backend
//    -> option 1 (create an api?), only send scraped data with no account_id -> backend figure out account_id
//    -> option 2 (from frontend), find account_id for each account -> then log data
// pull latest data and update local
//
