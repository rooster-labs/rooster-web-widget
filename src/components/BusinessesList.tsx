import { useState } from "react";
import { Business, BusinessesData } from "../data/Business";
import { AccountsList, PlusIcon } from "./AccountsList";


function ManageBusiness(props: any) {
  const business: Business = props.business;
  const onAddAccount = props.onAddAccount;

  return (
    <div className="collapse join-item collapse-arrow border border-base-300">
      <input type="checkbox" name="my-accordion-4" />
      <div className="text-m collapse-title font-medium">{business.name}</div>
      <div className="collapse-content">
        <AccountsList business={business} onAddAccount={onAddAccount}/>
      </div>
    </div>
  );
}

function AddBusiness(props: any) {
  const { onAddBusiness } = props;
  const [name, setName] = useState("Add New Business");

  return (
    <div className="flex items-center justify-between gap-2 text-base border border-base-300">
      <input
        type="text"
        value={name}
        placeholder="Add New Business"
        onChange={(e) => setName(e.target.value)}
        className="input input-sm input-ghost w-full max-w-xs m-2"
      />
      <button
        className="btn btn-ghost btn-circle btn-xs items-center mr-3"
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


export function ManageBusinessesList(props: any) {
  const businessData: BusinessesData = props.businessData;
  const onAddBusiness = props.onAddBusiness;
  const onAddAccount = props.onAddAccount;

  if (businessData == undefined) return null;

  const businessesList = Object.values(businessData);

  return (
    <div className="join join-vertical w-full">
      {businessesList.map((business) => (
        <ManageBusiness business={business} onAddAccount={onAddAccount}/>
      ))}
      <AddBusiness onAddBusiness={onAddBusiness}/>
    </div>
  );
}