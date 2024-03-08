import { useEffect, useState } from "react";
import "./App.css";
import { Product, ProductsData, calcNetWorth } from "./data/Accounts";

function App() {
  const [products, setProductsData] = useState<ProductsData>();

  useEffect(() => {
    chrome.storage.local.get(null, (data) => {
      console.log("Stored data:", data);
      setProductsData(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Rooster</h1>
      <h2>Net Worth: {calcNetWorth(products)}</h2>
      <p>
        {products
          ? Object.values(products).flatMap((product) => {
              return (
                product?.accounts?.map((account) => {
                  return (
                    <p>
                      Account: {`${product.name} ${account.accountName}`}
                      <br />
                      Value: {account.balance}
                    </p>
                  );
                }) ?? []
              );
            })
          : []}
      </p>
    </div>
  );
}

export default App;
