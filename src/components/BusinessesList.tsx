import React, { useState } from "react";
import { Business, BusinessesData } from "../data/Business";
import { AccountsList } from "./AccountsList";
import { PlusIcon } from "./ManageBusinessesIcons";

// Function Types
export type AddBusinessFunction = (businessName: string) => void;

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

interface AddBusinessProps {
  onAddBusiness: AddBusinessFunction;
};

interface ManageBusinessProps {
  business: Business;
  onAddAccount?: AddAccountFunction;
  onDeleteAccount?: DeleteAccountFunction;
  onEditAccount?: EditAccountFunction;
}

interface ManageBusinessesListProps {
  businessData: BusinessesData;
  onAddBusiness: AddBusinessFunction;
  onAddAccount: AddAccountFunction;
  onDeleteAccount: DeleteAccountFunction;
  onEditAccount: EditAccountFunction;
}

function ManageBusiness({
  business,
  onAddAccount,
  onDeleteAccount,
  onEditAccount,
}: ManageBusinessProps) {
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

function AddBusiness({ onAddBusiness }: AddBusinessProps) {
  const [name, setName] = useState("");
  const handleOnAddBusiness = () => {
    if (name.trim()) {
      onAddBusiness(name);
      setName("");
    }
  };

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
        onClick={handleOnAddBusiness}
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
}: ManageBusinessesListProps) {
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
