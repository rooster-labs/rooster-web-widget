import {
  AccountSummaryData,
  findAllAccountType,
} from "../../utils/common/data/AccountSummaryData.js";

export type ManageAccountsActionTypes =
  | "addAccountSummary"
  | "deleteAccountSummary"
  | "editBusinessName"
  | "addAccount"
  | "deleteAccount"
  | "editAccount"
  | "setData";

export type ManageAccountsAction = {
  type: ManageAccountsActionTypes;
  businessName: string;
  newBusinessName?: string;
  accountName?: string;
  newAccountName?: string;
  balance?: number;
  data?: AccountSummaryData;
};

export function accountSummaryDataReducer(
  state: AccountSummaryData,
  action: ManageAccountsAction,
): AccountSummaryData {
  const {
    type,
    businessName,
    newBusinessName,
    accountName,
    newAccountName,
    balance,
    data,
  } = action;

  // Validate businessName
  if (!businessName) {
    throw new Error("BusinessName is required.");
  }

  switch (type) {
    case "addAccountSummary":
      if (!state[businessName]) {
        state[businessName] = { businessName: businessName, accounts: [] };
      }
      break;

    case "deleteAccountSummary":
      delete state[businessName];
      break;

    case "editBusinessName":
      if (newBusinessName && state[businessName]) {
        state[businessName].businessName = newBusinessName;
      }
      break;

    case "addAccount":
      if (
        accountName &&
        balance !== undefined &&
        !state[businessName].accounts.find((a) => a.accountName === accountName)
      ) {
        state[businessName].accounts.push({
          accountName: accountName,
          balance: balance,
          types: findAllAccountType(accountName), // Assuming this function is defined elsewhere
        });
      }
      break;

    case "deleteAccount":
      if (accountName) {
        state[businessName].accounts = state[businessName].accounts.filter(
          (a) => a.accountName !== accountName,
        );
      }
      break;

    case "editAccount":
      if (accountName) {
        const account = state[businessName].accounts.find(
          (a) => a.accountName === accountName,
        );
        if (account) {
          account.accountName = newAccountName ?? account.accountName;
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
