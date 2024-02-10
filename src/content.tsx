import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const SimpliiBank = {
  checkings: new Array<Element>(),
  savings: new Array<Element>()
}

const logTransactions = () => {
  const trans = document.querySelectorAll("tr.transaction-row");

  if (trans) {
    console.log("List of Transactions: ");
    console.log(trans);
    SimpliiBank.checkings.push(...trans)
  } else {
    console.log("Transactions not found");
  }
};

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

setTimeout(logTransactions, 2000);

// const logTransactionDelay = (timeout: number) => (_event) => setTimeout(logTransactions,timeout)
// window.onload = logTransactions
