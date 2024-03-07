import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProductsData] = useState<Product>();

  useEffect(() => {
    chrome.storage.local.get(null, (data) => {
      console.log("Stored data:", data);
      setProductsData(data);
    });
  }, []);

  return (
    <div className="App">
      <h2>Rooster Financial</h2>
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
