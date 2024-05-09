import {
  ChartOptions,
  ChartData,
  ArcElement,
  Chart,
  Legend,
  Tooltip,
  LegendItem,
  Plugin,
} from "chart.js";
import { forwardRef, useEffect, useRef, useState } from "react";
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

interface NetWorthChartViewProps {
  accountSummaryData: AccountSummaryData;
}

interface NetWorthChartProps {
  data: ChartData<"doughnut", number[], string>;
}

const doughnutGraphOptions: ChartOptions = {
  plugins: {
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: "legend-ref",
    },
    legend: {
      display: false,
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

export function NetworthChartView({
  accountSummaryData,
}: NetWorthChartViewProps) {
  const [isDepositAccountSorted, setDepositSort] = useState(false);
  const handleToggle = () => setDepositSort(!isDepositAccountSorted);

  const data = createDoughnutGraphData(
    accountSummaryData,
    isDepositAccountSorted,
  );

  return (
    <div className="overflow-y-auto">
      <div className="flex justify-between text-base">
        <h2>Net Worth: {calcNetWorth(accountSummaryData).toFixed(2)}</h2>
        <button onClick={handleToggle}>Deposit Types / Accounts</button>
      </div>
      <NetworthChart2 data={data} />
    </div>
  );
}

function LegendView({ legendItems, chartObj }) {
  console.log("Legend View", { legendItems, chartObj });

  function handleVisibility(i: LegendItem) {
    if (i && chartObj) {
      chartObj.toggleDataVisibility(i.index);
      chartObj.update();
    }
  }

  return (
    <div className="h-40">
      <h1 className="text-lg"> Custom Legend </h1>
      <div className="max-h-40 overflow-y-auto" id="legend-ref">
        <ul className="list-disc pl-4">
          {legendItems.map((item, index) => (
            <li key={index} onClick={() => handleVisibility(item)}>
              {item.hidden ? (
                <span className="line-through">{item.text}</span>
              ) : (
                <span>{item.text}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const htmlLegendPlugin: Plugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    console.log("after update", { chart, args, options });
  },
};

export function NetworthChart2({ data }: NetWorthChartProps) {
  Chart.register(ArcElement, Tooltip, Legend);
  const [legendItems, setLegend] = useState<LegendItem[]>([]);
  const [chartObj, setChartObj] = useState<Chart>({} as Chart);
  const doughnutGraphRef = useRef(null);



  useEffect(() => {
    // @ts-ignore\\\
    const doughnutChart = new Chart(doughnutGraphRef.current, {
      type: "doughnut",
      data,
      options: doughnutGraphOptions,
      plugins: [htmlLegendPlugin],
    });

    if (doughnutChart) {
      setChartObj(doughnutChart);
      const chartLabels = doughnutChart?.options?.plugins?.legend?.labels;
      // @ts-ignore
      const items = chartLabels?.generateLabels(doughnutChart) ?? [];
      setLegend(items);
    }

    return () => {
      if (doughnutChart != undefined) {
        console.log("Destroying old graph");
        doughnutChart.destroy();
      }
    };
  }, [data]);

  return (
    <>
      <div className=" w-[30rem] overflow-x-auto pt-4">
        <canvas ref={doughnutGraphRef}></canvas>
      </div>
      <LegendView legendItems={legendItems} chartObj={chartObj}/>
    </>
  );
}
