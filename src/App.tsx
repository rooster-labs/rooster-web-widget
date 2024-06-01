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
import { getFinanceWebsite } from "./utils/common/domains/trackSiteDomain.js";
import UserProviderView, {
  isUserSignedIn,
} from "./components/userProvider/UserProvider.js";

function App() {
  const [navState, setNavState] = useState<NavState>("user_sign_up");
  const [activeFinancialSite, setActiveFinancialSite] = useState<string>();
  const accountSummaryRedu = useImmerReducer(
    accountSummaryDataReducer,
    {} as AccountSummaryData,
  );
  const [accountSummaryData, dispatch] = accountSummaryRedu;

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
    getFinanceWebsite().then((site) => {
      console.log(site);
      if (navState != "user_sign_up" && site) {
        setActiveFinancialSite(site);
        if (site && site !== "") setNavState("af_networth");
        else setNavState("networth");
      }
    });
  }, []);

  useEffect(() => {
    isUserSignedIn()
      .then((res) => (res ? "networth" : "user_sign_up"))
      .then(setNavState);
  }, []);

  function NavView() {
    switch (navState) {
      case "user_sign_up":
        return (
          <UserProviderView navState={navState} setNavState={setNavState} />
        );
      case "af_manage_business":
        return (
          <>
            <h3>{activeFinancialSite}</h3>
            <ManageAccountSummaryData reducer={accountSummaryRedu} />
            <BottomNav navState={navState} setNavState={setNavState} />
          </>
        );
      case "af_networth":
        return (
          <>
            <h3>{activeFinancialSite}</h3>
            <NetworthChartView data={accountSummaryData} />;
            <BottomNav navState={navState} setNavState={setNavState} />
          </>
        );
      case "networth":
        return <NetworthChartView data={accountSummaryData} />;
      default:
        return <NetworthChartView data={accountSummaryData} />;
    }
  }

  return (
    <div className="App">
      <TopBar />
      <NavView />
    </div>
  );
}

export default App;
