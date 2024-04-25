import { useState, useEffect } from "react";
import ManageBusinesses from "./components/ManageAccountSummaryData.js";
import "./App.css";
import {
  AccountSummaryData,
  getNetSummaryDataByAccount,
  getNetSummaryDataByType,
  calcNetWorth,
  getAccountSummaryData,
} from "./data/AccountSummaryData.js";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, ChartData, ChartOptions, Legend, Tooltip } from "chart.js";

type PieChartData = Array<{ name: string; value: number }>;



function App() {
  Chart.register(ArcElement, Tooltip, Legend);
  const [businessData, setBusinessData] = useState<AccountSummaryData>();

  useEffect(() => {
    getAccountSummaryData().then(data => setBusinessData(data));
  }, []);

  const netSummaryDataByAccount = getNetSummaryDataByAccount(businessData);
  const netSummaryDataByType = getNetSummaryDataByType(businessData);
  const matteColors: string[] = [
    'rgb(166, 206, 227)',
    'rgb(178, 223, 138)',
    'rgb(227, 26, 28)',
    'rgb(51, 160, 44)',
    'rgb(31, 120, 180)',
    'rgb(251, 154, 153)',
    'rgb(253, 191, 111)',
    'rgb(255, 127, 0)',
    'rgb(202, 178, 214)',
    'rgb(106, 61, 154)'
  ];

  const doughnutGraphOptions: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "start",
        maxWidth: 325,
        labels: {
          font: {
            size: 12
          }
        }
      },
    },
    layout: {
      autoPadding: false,
      padding: {
        // right: 2
      }
    },
    maintainAspectRatio: true, // Allows the chart to be responsive
    aspectRatio: 2.5, // Adjust the aspect ratio to set the width
  };

  const createDoughnutGraphData = (data: PieChartData): ChartData<"doughnut", number[], string> => {
    return {
      labels: data.map(d => d.name),
      datasets: [
        {
          label: "account balance ($)",
          data: data.map(d => d.value),
          backgroundColor: matteColors,
          hoverOffset: 4,
        }
      ],
    }
  }

  const dataByAccountOptions = createDoughnutGraphData(netSummaryDataByAccount);
  const dataByTypeOptions = createDoughnutGraphData(netSummaryDataByType);

  const [isDepositAccountSorted, setDepositSort] = useState(false);

  const handleToggle = () => {
    setDepositSort(!isDepositAccountSorted);
  };

  type NavState = "networth" | "manage-business" | "menu";

  const [navState, setNavState] = useState<NavState>("networth");


  function NetworthChart() {
    const data = isDepositAccountSorted ? dataByAccountOptions : dataByTypeOptions;

    return (
        <div className=" w-[30rem] pt-4 overflow-x-auto">
          <Doughnut data={data} options={doughnutGraphOptions}/>
        </div>
    )
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
        <ManageBusinesses
          initBusinessData={businessData}
          setBusinessData={setBusinessData}
        />
      );
    } else {
      return (
        <>
          <div className="flex justify-between text-base">
            <h2>Net Worth: {calcNetWorth(businessData).toFixed(2)}</h2>
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
