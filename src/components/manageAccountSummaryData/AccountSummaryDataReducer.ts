import { findAccountType } from "../../utils/common/data/accountSummary/accountClassifier.js";
import { ScrapedAccountData } from "../../utils/common/data/accountSummary/AccountSummaryExtractor.js";

export type ManageAccountsActionTypes =
  | "addAccountSummary"
  | "deleteAccountSummary"
  | "editServiceName"
  | "addAccount"
  | "deleteAccount"
  | "editAccount"
  | "setData";

export type ManageAccountsAction = {
  type: ManageAccountsActionTypes;
  serviceName: string;
  newServiceName?: string;
  accountName?: string;
  newAccountName?: string;
  balance?: number;
  data?: ScrapedAccountData[];
};

export function accountSummaryDataReducer(
  state: ScrapedAccountData[],
  action: ManageAccountsAction,
): ScrapedAccountData[] {
  const {
    type,
    serviceName,
    newServiceName,
    accountName,
    newAccountName,
    balance,
    data,
  } = action;

  // Validate businessName
  if (!serviceName) {
    throw new Error("BusinessName is required.");
  }

  switch (type) {
    case "addAccountSummary":
      break;

    case "deleteAccountSummary":
      return state.filter((a) => a.service_name != serviceName);
      break;

    case "editServiceName":
      if (newServiceName) {
        return state.map((a) => {
          if (a.service_name == serviceName) {
            a.service_name = newServiceName;
          }
          return a;
        });
      }
      break;

    case "addAccount":
      if (
        accountName &&
        balance !== undefined &&
        !state.find((a) => a.account_name === accountName)
      ) {
        state.push({
          account_name: accountName,
          balance: balance,
          account_type: findAccountType(accountName),
        } as ScrapedAccountData);
      }
      break;

    case "deleteAccount":
      if (accountName && serviceName) {
        state.filter(
          (a) =>
            !(a.service_name == serviceName && a.account_name == accountName),
        );
      }
      break;

    case "editAccount":
      if (accountName) {
        const account = state.find(
          (a) => a.account_name === accountName,
        );
        if (account) {
          account.account_name = newAccountName ?? account.account_name;
          account.balance = balance ?? account.balance;
        }
      }
      break;
    case "setData":
      if (data) {
        state = data;
      }
      break;
  }
  return state;
}
