import { useState } from "react";
import {
  DollarIcon,
  PlusIcon,
  TrashIcon,
} from "./ManageAccountSummaryIcons.js";
import {
  AddAccountFunction,
  DeleteAccountFunction,
  EditAccountFunction,
} from "./AccountSummaryList.js";
import { ScrapedAccountData } from "../../utils/common/data/AccountSummaryExtractor.js";

interface AddAccountProps {
  onAddAccount: AddAccountFunction;
  serviceName: string;
}

interface ManageAccountProps {
  serviceName: string;
  account: ScrapedAccountData;
  onDeleteAccount: DeleteAccountFunction;
  onEditAccount: EditAccountFunction;
}

interface AccountListProps {
  accountsInService: ScrapedAccountData[];
  onDeleteAccount: DeleteAccountFunction;
  onEditAccount: EditAccountFunction;
  onAddAccount: AddAccountFunction;
}

function AddAccount({ onAddAccount, serviceName }: AddAccountProps) {
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState<number>(0);

  const handleAddAccount = () => {
    if (accountName.trim()) {
      onAddAccount(serviceName, accountName, accountBalance);
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
  serviceName,
  account,
  onDeleteAccount,
  onEditAccount,
}: ManageAccountProps) {
  const [newAccountName, setNewAccountName] = useState(
    account.account_name ?? "",
  );
  const [newBalance, setNewBalance] = useState(account.balance ?? NaN);

  const handleBlurUpdate = () => {
    if (
      newAccountName !== account.account_name ||
      newBalance !== account.balance
    ) {
      onEditAccount(
        serviceName,
        account.account_name ?? "",
        newAccountName,
        newBalance,
      );
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 text-base">
      <input
        type="text"
        placeholder={account.account_name ?? "N/A"}
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
          placeholder={account?.balance?.toString() ?? "NaN"}
          value={newBalance.toString()}
          onChange={(e) => setNewBalance(parseFloat(e.target.value) || 0)}
          onBlur={handleBlurUpdate}
        />
      </label>
      <button
        className="btn btn-outline btn-error btn-xs items-center"
        onClick={() => onDeleteAccount(serviceName, account.account_name ?? "N/A")}
      >
        <TrashIcon />
      </button>
    </div>
  );
}

export function AccountsList({
  accountsInService,
  onDeleteAccount,
  onEditAccount,
  onAddAccount,
}: AccountListProps) {
  return (
    <div>
      <ul>
        {accountsInService.map((account) => (
          <li key={account.account_name}>
            <ManageAccount
              serviceName={account.service_name ?? "N/A"}
              account={account}
              onEditAccount={onEditAccount}
              onDeleteAccount={onDeleteAccount}
            />
          </li>
        ))}
        <li key="add-account">
          <AddAccount
            serviceName={accountsInService[0].service_name ?? "N/A"}
            onAddAccount={onAddAccount}
          />
        </li>
      </ul>
    </div>
  );
}
