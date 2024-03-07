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

  const totalValue = () => {
    let sum = 0;
    if (products) {
      Object.values(products).flatMap((product) => {
        product?.accounts?.map((account) => {
          console.log(account.balance, typeof account.balance);

          sum += account.balance;
        });
      });
    }

    return sum;
  };

  return (
    <div className="App">
      <h1>Rooster</h1>
      <h2>Net Worth: {totalValue()}</h2>
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
