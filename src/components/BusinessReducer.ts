import { BusinessesData, findAllAccountType } from "../data/Business";

export type BusinessesDataActionTypes =
  | "addBusiness"
  | "deleteBusiness"
  | "editBusinessName"
  | "addAccount"
  | "deleteAccount"
  | "editAccount";

export type BusinessesDataAction = {
  type: BusinessesDataActionTypes;
  businessName: string;
  newBusinessName?: string;
  accountName?: string;
  newAccountName?: string;
  balance?: number;
  newBalance?: number;
};

export function businessDataReducer(
  state: BusinessesData,
  action: BusinessesDataAction,
): BusinessesData {
  const {
    type,
    businessName,
    newBusinessName,
    accountName,
    newAccountName,
    balance,
  } = action;

  // Validate businessName
  if (!businessName) {
    throw new Error("BusinessName is required.");
  }

  switch (type) {
    case "addBusiness":
      if (!state[businessName]) {
        state[businessName] = { name: businessName, accounts: [] };
      }
      break;

    case "deleteBusiness":
      delete state[businessName];
      break;

    case "editBusinessName":
      if (newBusinessName && state[businessName]) {
        state[businessName].name = newBusinessName;
      }
      break;

    case "addAccount":
      if (
        accountName && balance !== undefined &&
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
        const account = state[businessName].accounts.find((a) =>
          a.accountName === accountName
        );
        if (account) {
          account.accountName = newAccountName ?? account.accountName;
          account.balance = balance ?? account.balance;
        }
      }
      break;
  }
  return state;
}
