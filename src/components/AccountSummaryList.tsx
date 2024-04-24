import React, { useState } from "react";
import { AccountSummary, AccountSummaryData } from "../data/AccountSummaryData.js";
import { AccountsList } from "./AccountsList.js";
import { PlusIcon } from "./ManageAccountSummaryIcons.js";

// Function Types
export type AddAccountSumFunction = (businessName: string) => void;

export type AddAccountFunction = (
  businessName: string,
  accountName: string,
  balance: number,
) => void;

export type DeleteAccountFunction = (
  businessName: string,
  accountName: string,
) => void;

export type EditAccountFunction = (
  businessName: string,
  accountName: string,
  newAccountName: string,
  balance: number,
) => void;

interface AddAccountSummaryProps {
  onAddAccountSummary: AddAccountSumFunction;
};

interface ManageAccountSummaryProps {
  accountSummary: AccountSummary;
  onAddAccount: AddAccountFunction;
  onDeleteAccount: DeleteAccountFunction;
  onEditAccount: EditAccountFunction;
}

interface ManageAccountSummaryDataProps {
  accountSummaryData: AccountSummaryData;
  onAddAccountSummary: AddAccountSumFunction;
  onAddAccount: AddAccountFunction;
  onDeleteAccount: DeleteAccountFunction;
  onEditAccount: EditAccountFunction;
}

function ManageAccountSummary({
  accountSummary,
  onAddAccount,
  onDeleteAccount,
  onEditAccount,
}: ManageAccountSummaryProps) {
  return (
    <div className="collapse join-item collapse-arrow border border-base-300">
      <input type="checkbox" name="my-accordion-4" />
      <div className="text-m collapse-title font-medium">{accountSummary.businessName}</div>
      <div className="collapse-content">
        <AccountsList
          business={accountSummary}
          onAddAccount={onAddAccount}
          onEditAccount={onEditAccount}
          onDeleteAccount={onDeleteAccount}
        />
      </div>
    </div>
  );
}

function AddAccountSummary({ onAddAccountSummary: onAddAccountSummary }: AddAccountSummaryProps) {
  const [name, setName] = useState("");
  const handleAddAccountSummary = () => {
    if (name.trim()) {
      onAddAccountSummary(name);
      setName("");
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 border border-base-300 text-base">
      <input
        type="text"
        value={name}
        placeholder="Add New Account Summary"
        onChange={(e) => setName(e.target.value)}
        className="input input-sm input-ghost m-2 w-full max-w-xs"
      />
      <button
        className="btn btn-circle btn-ghost btn-xs mr-3 items-center"
        onClick={handleAddAccountSummary}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export function ManageAccountSummaryList({
  accountSummaryData,
  onAddAccountSummary,
  onAddAccount,
  onDeleteAccount,
  onEditAccount,
}: ManageAccountSummaryDataProps) {
  const accountSummaryList = Object.values(accountSummaryData);

  return (
    <div className="join join-vertical w-full">
      <ul>
        {accountSummaryList.map((accountSum) => (
          <li key={accountSum.businessName}>
            <ManageAccountSummary
              accountSummary={accountSum}
              onAddAccount={onAddAccount}
              onEditAccount={onEditAccount}
              onDeleteAccount={onDeleteAccount}
            />
          </li>
        ))}
      </ul>
      <AddAccountSummary onAddAccountSummary={onAddAccountSummary} />
    </div>
  );
}
