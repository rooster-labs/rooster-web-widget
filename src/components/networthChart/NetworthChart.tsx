import { ChartOptions, ChartData, ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  AccountSummaryData,
  calcNetWorth,
  getNetSummaryDataByAccount,
  getNetSummaryDataByType,
} from "../../data/AccountSummaryData.js";

const matteColors: string[] = [
  "rgb(166, 206, 227)",
  "rgb(178, 223, 138)",
  "rgb(227, 26, 28)",
  "rgb(51, 160, 44)",
  "rgb(31, 120, 180)",
  "rgb(251, 154, 153)",
  "rgb(253, 191, 111)",
  "rgb(255, 127, 0)",
  "rgb(202, 178, 214)",
  "rgb(106, 61, 154)",
];

interface NetWorthChartProps {
  accountSummaryData: AccountSummaryData;
}

const doughnutGraphOptions: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      display: true,
      position: "right",
      align: "start",
      maxWidth: 325,
      labels: {
        font: {
          size: 12,
        },
      },
    },
  },
  layout: {
    autoPadding: false,
    padding: {
      // right: 2
    },
  },
  maintainAspectRatio: true, // Allows the chart to be responsive
  aspectRatio: 2.5, // Adjust the aspect ratio to set the width
};

const createDoughnutGraphData = (
  accountSummaryData: AccountSummaryData,
  isDepositAccountSorted: boolean,
): ChartData<"doughnut", number[], string> => {
  const data = isDepositAccountSorted
    ? getNetSummaryDataByAccount(accountSummaryData)
    : getNetSummaryDataByType(accountSummaryData);
  return {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "account balance ($)",
        data: data.map((d) => d.value),
        backgroundColor: matteColors,
        hoverOffset: 4,
      },
    ],
  };
};

export function NetworthChart({ accountSummaryData }: NetWorthChartProps) {
  Chart.register(ArcElement, Tooltip, Legend);

  const [isDepositAccountSorted, setDepositSort] = useState(false);

  const handleToggle = () => {
    setDepositSort(!isDepositAccountSorted);
  };

  const data = createDoughnutGraphData(
    accountSummaryData,
    isDepositAccountSorted,
  );

  return (
    <>
      <div className="flex justify-between text-base">
        <h2>Net Worth: {calcNetWorth(accountSummaryData).toFixed(2)}</h2>
        <button onClick={handleToggle}>Deposit Types / Accounts</button>
      </div>
      <div className=" w-[30rem] overflow-x-auto pt-4">
        <Doughnut data={data} options={doughnutGraphOptions} />
      </div>
    </>
  );
}
