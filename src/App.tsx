import { useState, useEffect } from "react";
import ManageAccountSummaryData from "./components/manageAccountSummaryData/ManageAccountSummaryData.js";
import "./App.css";
import {
  AccountSummaryData,
  getAccountSummaryData,
} from "./utils/common/data/AccountSummaryData.js";
import { useImmerReducer } from "use-immer";
import { accountSummaryDataReducer } from "./components/manageAccountSummaryData/AccountSummaryDataReducer.js";
import { NetworthChartView } from "./components/networthChart/NetworthChart.js";
import {
  BottomNav,
  NavState,
  TopBar,
} from "./components/navigation/NavComponents.js";
import { getActiveSiteDomain } from "./utils/common/domains/trackSiteDomain.js";

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

  useEffect(() => {
    getActiveSiteDomain();
  });

  function NavView() {
    switch (navState) {
      case "manage-business":
        return (
          <ManageAccountSummaryData
            accountSummaryReducer={accountSummaryReducer}
          />
        );
      default:
        return <NetworthChartView accountSummaryData={accountSummaryData} />;
    }
  }

  return (
    <div className="App">
      <TopBar />
      <NavView />
      <BottomNav navState={navState} setNavState={setNavState} />
    </div>
  );
}

export default App;
