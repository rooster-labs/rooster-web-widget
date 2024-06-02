import { UserTableType } from "../apis/accountSummaryService.js";
import { AccountSummary, AccountSummaryData } from "./AccountSummaryData.js";

const USER_INFO = "user_info";

const ACCOUNT_SUMMARY_DATA = "accountSummaryData";

const CLS = chrome.storage.local;

async function getUserInfo(): Promise<UserTableType> {
  return await CLS.get([USER_INFO]).then((res) => res[USER_INFO]);
}

async function setUserInfo(userInfo: UserTableType) {
  return CLS.set({ [USER_INFO]: userInfo });
}

async function getAccountSummaryData(): Promise<AccountSummaryData> {
  const res = await CLS.get([ACCOUNT_SUMMARY_DATA]);
  const data: AccountSummaryData = res[ACCOUNT_SUMMARY_DATA] ?? {};
  console.log("Get Account Summary Data", data);
  return data;
}

async function updateAccountSummary(
  accountSummary: AccountSummary,
): Promise<void> {
  const newAccountSummary = { [accountSummary.businessName]: accountSummary };
  console.log("Update Account Summary", accountSummary);

  await CLS
    .get([ACCOUNT_SUMMARY_DATA])
    .then((data) => data?.accountSummaryData ?? {})
    .then((d) => Object.assign(d, newAccountSummary))
    .then((d) => setAccountSummaryData(d));
}

async function setAccountSummaryData(
  accountSummaryData: AccountSummaryData,
): Promise<void> {
  console.log("Set Account Summary", accountSummaryData);
  await CLS.set({
    [ACCOUNT_SUMMARY_DATA]: accountSummaryData,
  });
}

const ls = {
  getUserInfo,
  setUserInfo,
  getAccountSummaryData,
  updateAccountSummary,
  setAccountSummaryData,
};

export { ls };
