import { useState } from "react";
import { Business, BusinessesData } from "../data/Business.js";
import { AccountsList, PlusIcon } from "./AccountsList.js";

type IOnAddBusiness = (businessName: string) => void;
type IOnAddAccount = (
  businessName: string,
  accountName: string,
  balance: number,
) => void;
type IOnDeleteAccount = (businessName: string, accountName: string) => void;
type IOnEditAccount = (
  businessName: string,
  accountName: string,
  newAccountName: string,
  balance: number,
) => void;

export type ManageBusinessListProps = {
  businessData?: BusinessesData;
  business?: Business;
  account?: Account;
  businessName?: string;
  onAddBusiness?: IOnAddBusiness;
  onAddAccount?: IOnAddAccount;
  onDeleteAccount?: IOnDeleteAccount;
  onEditAccount?: IOnEditAccount;
};

function ManageBusiness({
  business,
  onAddAccount,
  onDeleteAccount,
  onEditAccount,
}: ManageBusinessListProps) {
  if (!business) throw new Error("Business is undefined");
  
  return (
    <div className="collapse join-item collapse-arrow border border-base-300">
      <input type="checkbox" name="my-accordion-4" />
      <div className="text-m collapse-title font-medium">{business.name}</div>
      <div className="collapse-content">
        <AccountsList
          business={business}
          onAddAccount={onAddAccount}
          onEditAccount={onEditAccount}
          onDeleteAccount={onDeleteAccount}
        />
      </div>
    </div>
  );
}

function AddBusiness({ onAddBusiness }: ManageBusinessListProps) {
  if (!onAddBusiness) throw new Error("onAddBusiness is required");

  const [name, setName] = useState("Add New Business");

  return (
    <div className="flex items-center justify-between gap-2 border border-base-300 text-base">
      <input
        type="text"
        value={name}
        placeholder="Add New Business"
        onChange={(e) => setName(e.target.value)}
        className="input input-sm input-ghost m-2 w-full max-w-xs"
      />
      <button
        className="btn btn-circle btn-ghost btn-xs mr-3 items-center"
        onClick={() => {
          onAddBusiness(name);
          setName("");
        }}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export function ManageBusinessesList({
  businessData,
  onAddBusiness,
  onAddAccount,
  onDeleteAccount,
  onEditAccount,
}: ManageBusinessListProps) {
  if (businessData == undefined) return null;

  const businessesList = Object.values(businessData);

  return (
    <div className="join join-vertical w-full">
      <ul>
        {businessesList.map((business) => (
          <li key={business.name}>
            <ManageBusiness
              business={business}
              onAddAccount={onAddAccount}
              onEditAccount={onEditAccount}
              onDeleteAccount={onDeleteAccount}
            />
          </li>
        ))}
      </ul>
      <AddBusiness onAddBusiness={onAddBusiness} />
    </div>
  );
}
