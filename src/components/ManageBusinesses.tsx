import React from "react";
import { useImmerReducer } from "use-immer";
import { BusinessesData } from "../data/Business.js";
import { ManageBusinessesList } from "./BusinessesList.js";
import { businessDataReducer } from "./BusinessReducer.js";

interface ManageBusinessesProp {
  initBusinessData: BusinessesData | undefined;
  setBusinessData: (businessData: BusinessesData) => void;
}

function ManageBusinesses({
  initBusinessData,
  setBusinessData,
}: ManageBusinessesProp) {
  const [businessData, dispatch] = useImmerReducer(
    businessDataReducer,
    initBusinessData ?? {},
  );

  function handleAddBusiness(businessName: string) {
    dispatch({
      type: "addBusiness",
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
      <ManageBusinessesList
        businessData={businessData}
        onAddBusiness={handleAddBusiness}
        onAddAccount={handleAddAccount}
        onEditAccount={handleEditAccount}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
}

export default ManageBusinesses;
