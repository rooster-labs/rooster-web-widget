import { useState } from "react";
import { DollarIcon, PlusIcon, TrashIcon } from "./ManageBusinessesIcons.js";
import {
  AddAccountFunction,
  DeleteAccountFunction,
  EditAccountFunction,
} from "./BusinessesList.js";
import { Account, Business } from "../data/Business.js";
import React from "react";

interface AddAccountProps {
  onAddAccount: AddAccountFunction;
  businessName: string;
}

interface ManageAccountProps {
  businessName: string;
  account: Account;
  onDeleteAccount: DeleteAccountFunction;
  onEditAccount: EditAccountFunction;
}

interface AccountListProps {
  business: Business;
  onDeleteAccount: DeleteAccountFunction;
  onEditAccount: EditAccountFunction;
  onAddAccount: AddAccountFunction;
}

function AddAccount({ onAddAccount, businessName }: AddAccountProps) {
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState<number>(0);

  const handleAddAccount = () => {
    if (accountName.trim()) {
      onAddAccount(businessName, accountName, accountBalance);
      setAccountName("");
      setAccountBalance(0);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 text-base">
      <input
        type="text"
        placeholder="Add New Account"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        className="input input-sm input-ghost w-full max-w-xs"
      />
      <label className="input input-sm input-ghost flex items-center gap-2">
        <DollarIcon />
        <input
          type="number"
          className="grow"
          placeholder="Set account balance"
          value={accountBalance}
          onChange={(e) => setAccountBalance(parseFloat(e.target.value) || 0)}
        />
      </label>
      <button
        className="btn btn-circle btn-ghost btn-xs ml-1.5 mr-1 items-center"
        onClick={handleAddAccount}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

function ManageAccount({
  businessName,
  account,
  onDeleteAccount,
  onEditAccount,
}: ManageAccountProps) {
  const [newAccountName, setNewAccountName] = useState(account.accountName);
  const [newBalance, setNewBalance] = useState(account.balance);

  const handleBlurUpdate = () => {
    if (
      newAccountName !== account.accountName ||
      newBalance !== account.balance
    ) {
      onEditAccount(
        businessName,
        account.accountName,
        newAccountName,
        newBalance,
      );
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 text-base">
      <input
        type="text"
        placeholder={account.accountName}
        value={newAccountName}
        onChange={(e) => setNewAccountName(e.target.value)}
        onBlur={handleBlurUpdate}
        className="input input-sm input-ghost w-full max-w-xs"
      />
      <label className="input input-sm input-ghost flex items-center gap-2">
        <DollarIcon />
        <input
          type="number"
          className="grow"
          placeholder={account.balance.toString()}
          value={newBalance.toString()}
          onChange={(e) => setNewBalance(parseFloat(e.target.value) || 0)}
          onBlur={handleBlurUpdate}
        />
      </label>
      <button
        className="btn btn-outline btn-error btn-xs items-center"
        onClick={() => onDeleteAccount(businessName, account.accountName)}
      >
        <TrashIcon />
      </button>
    </div>
  );
}

export function AccountsList({
  business,
  onDeleteAccount,
  onEditAccount,
  onAddAccount,
}: AccountListProps) {
  return (
    <div>
      <ul>
        {business.accounts.map((account) => (
          <li key={account.accountName}>
            <ManageAccount
              businessName={business.name}
              account={account}
              onEditAccount={onEditAccount}
              onDeleteAccount={onDeleteAccount}
            />
          </li>
        ))}
        <li key="add-account">
          <AddAccount
            businessName={business.name}
            onAddAccount={onAddAccount}
          />
        </li>
      </ul>
    </div>
  );
}
