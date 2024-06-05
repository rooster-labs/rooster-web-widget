import React, { useEffect } from "react";
import { ManageAccountSummaryList } from "./AccountSummaryList.js";
import { ManageAccountsAction } from "./AccountSummaryDataReducer.js";
import { ls } from "../../utils/common/data/localStorage.js";
import { ScrapedAccountData } from "../../utils/common/data/accountSummary/AccountSummaryExtractor.js";

interface IManageAccountSumDataProp {
  reducer: [ScrapedAccountData[], React.Dispatch<ManageAccountsAction>];
}

function ManageAccountSummaryData({
  reducer: accountSummaryReducer,
}: IManageAccountSumDataProp) {
  const [accountSummaryData, dispatch] = accountSummaryReducer;

  useEffect(() => {
    console.log("Manage Account", accountSummaryData);
    ls.setAccountData(accountSummaryData);
  }, [accountSummaryData]);

  function handleAddBusiness(serviceName: string) {
    dispatch({
      type: "addAccountSummary",
      serviceName,
    });
  }

  function handleAddAccount(
    serviceName: string,
    accountName: string,
    balance: number,
  ) {
    dispatch({
      type: "addAccount",
      serviceName,
      accountName,
      balance,
    });
  }

  function handleEditAccount(
    serviceName: string,
    accountName: string,
    newAccountName: string,
    balance: number,
  ) {
    dispatch({
      type: "editAccount",
      serviceName,
      accountName,
      newAccountName,
      balance,
    });
  }

  function handleDeleteAccount(serviceName: string, accountName: string) {
    dispatch({
      type: "deleteAccount",
      serviceName,
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
