import {
  ChartOptions,
  ChartData,
  ArcElement,
  Chart,
  Legend,
  Tooltip,
  LegendItem,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  AccountSummaryData,
  calcNetWorth,
  getNetSummaryDataByAccount,
  getNetSummaryDataByType,
} from "../../utils/common/data/AccountSummaryData.js";
import { Updater, useImmer } from "use-immer";

interface NetWorthChartViewProps {
  data: AccountSummaryData;
}

interface NetWorthChartProps {
  data: ChartData<"doughnut", number[], string>;
}

interface LegendViewProps {
  legendItems: LegendItem[];
  chartObj: Chart;
  setLegend: Updater<LegendItem[]>;
}

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

const doughnutGraphOptions: ChartOptions<"doughnut"> = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function (this, tooltipItem) {
          const balance = tooltipItem.parsed;
          return `balance ($): ${balance}`;
        },
        title: function (this, tooltipItem) {
          return tooltipItem[0].label.split("-")[0].trim();
        },
      },
    },
    legend: {
      display: false,
    },
  },
  layout: {
    autoPadding: false,
  },
  maintainAspectRatio: true, // Allows the chart to be responsive
  aspectRatio: 1, // Adjust the aspect ratio to set the width
};

function createDoughnutGraphData(
  accountSummaryData: AccountSummaryData,
  isDepositAccountSorted: boolean,
): ChartData<"doughnut", number[], string> {
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
}

function ColouredCircle({ i }: { i: number }) {
  const unicodeForCircle = "\u25CF";
  return (
    <span
      style={{
        color: matteColors[i % matteColors.length],
        marginRight: "8px",
      }}
    >
      {unicodeForCircle}
    </span>
  );
}

function LegendView({ legendItems, chartObj, setLegend }: LegendViewProps) {
  function handleVisibility(item: LegendItem | null) {
    const i = item?.index;
    if (i != undefined && chartObj) {
      chartObj.toggleDataVisibility(i);
      chartObj.update();
      setLegend((draft) => {
        draft[i].hidden = !draft[i].hidden;
        return draft;
      });
    }
  }

  return (
    <ul className="h-[200px] list-none overflow-y-auto px-4 pt-6">
      {legendItems.map((item, index) => (
        <li key={index} onClick={() => handleVisibility(item)}>
          <ColouredCircle i={index} />
          <span className={item.hidden ? "line-through" : ""}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function NetworthChart({ data }: NetWorthChartProps) {
  Chart.register(ArcElement, Tooltip, Legend);
  const [legendItems, setLegend] = useImmer<LegendItem[]>([]);
  const [chartObj, setChartObj] = useState<Chart>({} as Chart);
  const doughnutGraphRef = useRef(null);

  useEffect(() => {
    const doughnutChart = doughnutGraphRef?.current ?? ({} as Chart);
    const chartLabels = doughnutChart?.options?.plugins?.legend?.labels ?? {};
    const items = chartLabels?.generateLabels?.(doughnutChart) ?? [];
    setChartObj(doughnutChart);
    setLegend(items);
  }, [data]);

  return (
    <div className="flex h-full items-center justify-start">
      <div className=" w-[200px] pt-4">
        <Doughnut
          ref={doughnutGraphRef}
          data={data}
          options={doughnutGraphOptions}
        />
      </div>
      <LegendView
        legendItems={legendItems}
        chartObj={chartObj}
        setLegend={setLegend}
      />
    </div>
  );
}

export function NetworthChartView({
  data: accountSummaryData,
}: NetWorthChartViewProps) {
  const [isDepositAccountSorted, setDepositSort] = useState(false);
  const handleToggle = () => setDepositSort(!isDepositAccountSorted);

  const data = createDoughnutGraphData(
    accountSummaryData,
    isDepositAccountSorted,
  );

  const netWorth = calcNetWorth(accountSummaryData);

  return (
    <div>
      <div className="flex justify-between text-base">
        <b>
          {Intl.NumberFormat("en-EN", {
            style: "currency",
            currency: "USD",
          }).format(netWorth)}
        </b>
        <button onClick={handleToggle}>Deposit Types / Accounts</button>
      </div>
      <NetworthChart data={data} />
    </div>
  );
}
