import { useState, useEffect } from "react";
import ManageAccountSummaryData from "./components/manageAccountSummaryData/ManageAccountSummaryData.js";
import "./App.css";
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
import { ls } from "./utils/common/data/localStorage.js";
import { ScrapedAccountData } from "./utils/common/data/AccountSummaryExtractor.js";

function App() {
  const [navState, setNavState] = useState<NavState>("user_sign_up");
  const [activeFinancialSite, setActiveFinancialSite] = useState<string>();
  const accountSummaryRedu = useImmerReducer(
    accountSummaryDataReducer,
    [] as ScrapedAccountData[],
  );
  const [accountSummaryData, dispatch] = accountSummaryRedu;

  useEffect(() => {
    ls.getAccountSummaryData().then((data) => {
      dispatch({
        type: "setData",
        serviceName: "setData",
        data: data,
      });
    });
  }, []);

  useEffect(() => {
    getFinanceWebsite().then((site) => {
      console.log("Get website", site);
      setActiveFinancialSite(site);
    });
  }, []);

  useEffect(() => {
    let activeSite: string | undefined = undefined;

    getFinanceWebsite()
      .then((site) => {
        console.log("Get website", site);
        setActiveFinancialSite(site);
        activeSite = site;
      })
      .then(() => {
        isUserSignedIn().then((isSignedIn) => {
          if (isSignedIn) {
            if (activeSite && activeSite != "") {
              setNavState("af_networth");
            } else {
              setNavState("networth");
            }
          } else {
            setNavState("user_sign_up");
          }
        });
      });
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
