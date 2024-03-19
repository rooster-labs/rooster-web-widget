import { useEffect, useState } from "react";
import "./App.css";
import { ProductsData, calcNetWorth, getNetSummaryData } from "./data/Product";
import ReactECharts from "echarts-for-react";

function App() {
  const [products, setProductsData] = useState<ProductsData>();

  useEffect(() => {
    chrome.storage.local.get(null, (data) => {
      console.log("Stored data:", data);
      setProductsData(data);
    });
  }, []);

  const netSummaryData = getNetSummaryData(products);

  const options = {
    // title: {
    //   text: "A Case of Doughnut Chart",
    //   left: "center",
    // },
    legend: {
      orient: "vertical",
      right: 0,
      // x: 'right',
      top: "center",
      data: netSummaryData.map((d) => d.name),
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
        data: netSummaryData,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Rooster Financial</h1>
      <h2>Net Worth: {calcNetWorth(products).toFixed(2)}</h2>
      <div>
        <ReactECharts option={options} style={{ height: 200, width: 500 }} />
      </div>
    </div>
  );
}

export default App;
