import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface IAccountData {
  accountName: string; //"Checking Account";
  cash: string; //"$10,000";
  marketValue: string; //"N/A";
  totalEquity: string; //"$10,000";
}

interface IAccountLogs {
  [key: string]: IAccountData;
}

function App() {
  const [accountData, setAccountData] = useState<IAccountLogs>();

  useEffect(() => {
    chrome.storage.local.get(null, (data) => {
      console.log("Stored data:", data);
      setAccountData(data);
    });
  }, []);

  return (
    <div className="App">
      <h2>Rooster Financial</h2>
      <p>
        {accountData
          ? Object.keys(accountData).map((accountKey) => {
              const account = accountData[accountKey];

              return (
                <p>
                  Account:{account.accountName}
                  <br/>
                  Value:{account.cash}
                </p>
              );
            })
          : []}
      </p>
    </div>
  );
}

export default App;
