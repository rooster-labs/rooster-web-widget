import { useState, useEffect } from "react";
import ManageAccountSummaryData from "./components/manageAccountSummaryData/ManageAccountSummaryData.js";
import "./App.css";
import {
  AccountSummaryData,
  getAccountSummaryData,
} from "./data/AccountSummaryData.js";
import { useImmerReducer } from "use-immer";
import { accountSummaryDataReducer } from "./components/manageAccountSummaryData/AccountSummaryDataReducer.js";
import { NetworthChart } from "./components/networthChart/NetworthChart.js";
import { BottomNav, NavState } from "./components/navigation/NavBar.js";

function App() {
  const [navState, setNavState] = useState<NavState>("networth");
  const accountSummaryReducer = useImmerReducer(
    accountSummaryDataReducer,
    {} as AccountSummaryData,
  );
  const [accountSummaryData, dispatch] = accountSummaryReducer;

  useEffect(() => {
    getAccountSummaryData().then((data) => {
      dispatch({
        type: "setData",
        businessName: "setData",
        data: data,
      });
    });
  }, []);

  function NavView() {
    switch (navState) {
      case "manage-business":
        return (
          <ManageAccountSummaryData
            accountSummaryReducer={accountSummaryReducer}
          />
        );
      default:
        return <NetworthChart accountSummaryData={accountSummaryData} />;
    }
  }

  return (
    <div className="App">
      <h1 className="text-lg">Rooster Financial</h1>
      <NavView />
      <BottomNav setNavState={setNavState} />
    </div>
  );
}

export default App;
