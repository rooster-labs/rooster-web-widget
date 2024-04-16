import { useState } from "react";
import { Account, Business } from "../data/Business.js";

function DollarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}


export function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function AddAccount(props: any) {
  const onAddAccount = props.onAddAccount;
  const businessName: string = props.businessName;
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setBalance] = useState(0);

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
          placeholder="Set account Balance"
          value={accountBalance}
          onChange={(e) => setBalance(parseFloat(e.target.value))}
        />
      </label>
      <button 
        className="btn btn-ghost btn-circle btn-xs items-center mr-1 ml-1.5"
        onClick={() => {
          onAddAccount(businessName, accountName, accountBalance);
          setAccountName("");
          setBalance(0)
        }}
        >
        <PlusIcon />
      </button>
    </div>
  );
}

// TODO: Switch to Flex Grid design
function ManageAccount({ account }: { account: Account }) {
  return (
    <div className="flex items-center justify-between gap-2 text-base">
      <input
        type="text"
        placeholder={account.accountName}
        value={account.accountName}
        className="input input-sm input-ghost w-full max-w-xs"
      />
      <label className="input input-sm input-ghost flex items-center gap-2">
        <DollarIcon />
        <input
          type="number"
          className="grow"
          placeholder={`${account.balance}`}
          value={`${account.balance}`}
        />
      </label>
      <button className="btn btn-outline btn-error btn-xs items-center">
        <TrashIcon />
      </button>
    </div>
  );
}

export function AccountsList(props: any) {
  const business: Business = props.business;
  const onAddAccount = props.onAddAccount;
  const {name, accounts} = business;

  return (
    <div>
      {accounts.map((account) => (
        <ManageAccount account={account} />
      ))}
      <AddAccount businessName={name} onAddAccount={onAddAccount}/>
    </div>
  );
}