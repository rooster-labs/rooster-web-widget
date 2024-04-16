import { useImmerReducer } from "use-immer";
import { BusinessesData, Business, Account } from "../data/Business.js";
import { ManageBusinessesList } from "./BusinessesList.js";
import { businessDataReducer } from "../data/BusinessReducer.js";
  

function ManageBusinesses({
  initBusinessData,
  setBusinessData,
}: {
  initBusinessData: BusinessesData | undefined;
  setBusinessData: (businessData: BusinessesData) => void;
}) {
  
  const [businessData, dispatch] = useImmerReducer(businessDataReducer, initBusinessData ?? {})

  function handleAddBusiness(businessName: string) {
    dispatch({
      type: "addBusiness",
      businessName: businessName,
    })
  }

  function handleAddAccount(businessName: string, accountName: string, balance: number) {
    dispatch({
      type: "addAccount",
      businessName,
      accountName,
      balance
    })
  }

  return (
    <div className="h-64 overflow-y-scroll">
      <h2 className="text-m">Manage Businesses</h2>
      <ManageBusinessesList 
      businessData={businessData} 
      onAddBusiness={handleAddBusiness}
      onAddAccount={handleAddAccount}/>
    </div>
  );
}

export default ManageBusinesses;
