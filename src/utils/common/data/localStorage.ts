import { AccountData, UserTableType } from "../apis/accountSummaryService.js";
import { ScrapedAccountData } from "./accountSummary/AccountSummaryExtractor.js";

const USER_INFO = "user_info";

const ACCOUNT_SUMMARY_DATA = "account_summary_data";

const CLS = chrome.storage.local;

async function getUserInfo(): Promise<UserTableType> {
  return await CLS.get([USER_INFO]).then((res) => res[USER_INFO]);
}

async function setUserInfo(userInfo: UserTableType) {
  return CLS.set({ [USER_INFO]: userInfo });
}

async function getAccountSummaryData(): Promise<ScrapedAccountData[]> {
  const res = await CLS.get([ACCOUNT_SUMMARY_DATA]);
  const data: ScrapedAccountData[] = res[ACCOUNT_SUMMARY_DATA] ?? [];
  console.log("Get Account Summary Data", data);
  return data;
}

function updateAccountDataWithScraped(
  scrapedData: ScrapedAccountData[],
  oldData: ScrapedAccountData[],
) {
  const service_name = scrapedData[0].service_name;
  const newData: ScrapedAccountData[] = oldData.filter((a) =>
    !((a.service_name == service_name) &&
      scrapedData.some((sa) => sa.account_name == a.account_name))
  );
  newData.push(...scrapedData);

  return newData;
}

async function updateAccountDataForService(scrapedData: ScrapedAccountData[]) {
  const oldData = await getAccountSummaryData();
  setAccountData(updateAccountDataWithScraped(scrapedData, oldData));
}

async function setAccountData(
  accountData: ScrapedAccountData[],
): Promise<void> {
  console.log("Set Account Summary", accountData);
  await CLS.set({
    [ACCOUNT_SUMMARY_DATA]: accountData,
  });
}

const ls = {
  getUserInfo,
  setUserInfo,
  getAccountSummaryData,
  updateAccountDataForService,
  setAccountData,
} as const;

export { ls };
