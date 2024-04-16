import {
  Account,
  Business,
  BusinessesData,
  findAllAccountType,
} from "./Business.js";

class ManageBusiness implements BusinessesData {
  [key: string]: Business;

  constructor(data: BusinessesData) {
    Object.assign(this, data);
  }
}

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
};

export function businessDataReducer(
  draftState: BusinessesData,
  action: BusinessesDataAction,
) {
  const {
    type,
    businessName,
    newBusinessName,
    accountName,
    newAccountName,
    balance,
  } = action;

  if (businessName == undefined) {
    console.log("Error! BusinessName is undefined.");
    return draftState;
  }

  if (type == "addBusiness") {
    const newBusiness = { name: businessName, accounts: [] };
    draftState[businessName] = newBusiness;
    return draftState;
  } else if (type == "deleteBusiness") {
    const newDraft: BusinessesData = {};

    for (const k of Object.keys(draftState)) {
      if (k != businessName) {
        newDraft[k] = draftState[k];
      }
    }
    return newDraft;
  } else if (type == "editBusinessName") {
    if (newBusinessName != undefined) {
      draftState[businessName].name = newBusinessName;
    }
  } else if (type == "addAccount") {
    if (accountName != undefined && balance != undefined) {
      draftState[businessName].accounts.push({
        accountName: accountName,
        balance: balance,
        types: findAllAccountType(accountName),
      });
    }
  } else if (type == "deleteAccount") {
    if (action.accountName != undefined) {
      draftState[action.businessName].accounts = draftState[action.businessName].accounts
        .filter(
          (a) => a.accountName != a.accountName,
        );
    }
  } else if (type == "editAccount") {
    if (accountName != undefined) {
      draftState[businessName].accounts.forEach((a) => {
        if (a.accountName == accountName) {
          a.accountName = newAccountName ?? a.accountName;
          a.balance = balance ?? a.balance;
        }
      });
    }
  }
}
