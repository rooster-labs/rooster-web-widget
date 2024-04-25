import React, { useEffect } from "react";
import {
  AccountSummaryData,
  setAccountSummaryData,
} from "../data/AccountSummaryData.js";
import { ManageAccountSummaryList } from "./AccountSummaryList.js";
import { ManageAccountsAction } from "./AccountSummaryDataReducer.js";

interface ManageAccountSumDataProp {
  accountSummaryReducer: [
    AccountSummaryData,
    React.Dispatch<ManageAccountsAction>,
  ];
}

function ManageAccountSummaryData({
  accountSummaryReducer,
}: ManageAccountSumDataProp) {
  const [accountSummaryData, dispatch] = accountSummaryReducer;

  useEffect(() => {
    console.log("manage Account", accountSummaryData);
    setAccountSummaryData(accountSummaryData);
  }, [accountSummaryData]);

  function handleAddBusiness(businessName: string) {
    dispatch({
      type: "addAccountSummary",
      businessName: businessName,
    });
  }

  function handleAddAccount(
    businessName: string,
    accountName: string,
    balance: number,
  ) {
    dispatch({
      type: "addAccount",
      businessName,
      accountName,
      balance,
    });
  }

  function handleEditAccount(
    businessName: string,
    accountName: string,
    newAccountName: string,
    balance: number,
  ) {
    dispatch({
      type: "editAccount",
      businessName,
      accountName,
      newAccountName,
      balance,
    });
  }

  function handleDeleteAccount(businessName: string, accountName: string) {
    dispatch({
      type: "deleteAccount",
      businessName,
      accountName,
    });
  }

  return (
    <div className="h-64 overflow-y-scroll">
      <h2 className="text-m">Manage Businesses</h2>
      <ManageAccountSummaryList
        accountSummaryData={accountSummaryData}
        onAddAccountSummary={handleAddBusiness}
        onAddAccount={handleAddAccount}
        onEditAccount={handleEditAccount}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
}

export default ManageAccountSummaryData;
