import { useEffect, useState } from "react";
import "./App.css";
import {
  BusinessesData,
  calcNetWorth,
  getNetSummaryDataByAccount,
  getNetSummaryDataByType,
} from "./data/Business";
import ReactECharts from "echarts-for-react";

type PieChartData = Array<{ name: string; value: number }>;

function App() {
  const [products, setProductsData] = useState<BusinessesData>();

  useEffect(() => {
    chrome.storage.local.get(null, (data) => {
      console.log("Stored data:", data);
      setProductsData(data);
    });
  }, []);

  const netSummaryDataByAccount = getNetSummaryDataByAccount(products);
  const netSummaryDataByType = getNetSummaryDataByType(products);

  const createOption = (data: PieChartData) => {
    return {
      // title: {
      //   text: "A Case of Doughnut Chart",
      //   left: "center",
      // },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 0,
        // x: 'right',
        top: "center",
        data: data.map((d) => d.name),
      },
      series: [
        {
          type: "pie",
          left: 0,
          top: "center",
          width: 200,
          height: 200,
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "14",
              fontWeight: "bold",
            },
          },
          data: data,
        },
      ],
    };
  };
  const dataByAccountOptions = createOption(netSummaryDataByAccount);
  const dataByTypeOptions = createOption(netSummaryDataByType);

  const [isDepositAccountSorted, setDepositSort] = useState(false);

  const handleToggle = () => {
    setDepositSort(!isDepositAccountSorted);
  };

  type NavState = "networth" | "manage-business" | "menu";

  const [navState, setNavState] = useState<NavState>("networth");

  function NetworthChart() {
    return isDepositAccountSorted ? (
      <ReactECharts
        option={dataByAccountOptions}
        style={{ height: 250, width: 500 }}
      />
    ) : (
      <ReactECharts
        option={dataByTypeOptions}
        style={{ height: 250, width: 500 }}
      />
    );
  }

  function BottomNav() {
    return (
      <div className="btm-nav h-10">
        <button className="text-info" onClick={() => setNavState("networth")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
            />
          </svg>
        </button>
        <button
          className="active text-info"
          onClick={() => setNavState("manage-business")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button className="text-info" onClick={() => setNavState("networth")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
      </div>
    );
  }

  function NavView() {
    if (navState == "manage-business") {
      return (
        <div className="">
          <h2 className="text-lg">"Manage business"</h2>
        </div>
      );
    } else {
      return (
        <>
          <div className="flex justify-between text-base">
            <h2>Net Worth: {calcNetWorth(products).toFixed(2)}</h2>
            <button onClick={handleToggle}>Deposit Types / Accounts</button>
          </div>
          <NetworthChart />
        </>
      );
    }
  }

  return (
    <div className="App">
      <h1 className="text-lg">Rooster Financial</h1>
      <NavView />
      <BottomNav />
    </div>
  );
}

export default App;
