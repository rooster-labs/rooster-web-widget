import { useEffect, useState } from "react";
import "./App.css";
import {
  ProductsData,
  calcNetWorth,
  getNetSummaryDataByAccount,
  getNetSummaryDataByType,
} from "./data/Product";
import ReactECharts from "echarts-for-react";

type PieChartData = Array<{ name: string; value: number }>;

function App() {
  const [products, setProductsData] = useState<ProductsData>();

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

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="App">
      <h1 className="text-lg">Rooster Financial</h1>
      <div className="flex justify-between text-base">
        <h2>Net Worth: {calcNetWorth(products).toFixed(2)}</h2>
        <button onClick={handleToggle}>Deposit Types / Accounts</button>
      </div>
      {isToggled ? (
        <div>
          <ReactECharts
            option={dataByAccountOptions}
            style={{ height: 200, width: 500 }}
          />
        </div>
      ) : (
        <div>
          <ReactECharts
            option={dataByTypeOptions}
            style={{ height: 200, width: 500 }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
