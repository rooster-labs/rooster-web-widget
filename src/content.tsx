import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const SimpliiBank = {
  checkings: new Array<string>(),
  savings: new Array<string>(),
};

const logTransactions = () => {
  const transactionRows = document.querySelectorAll("tr.transaction-row");

  const depositDetailsNode = document.querySelector("div.deposit-details");
  const productNameNode =
    depositDetailsNode?.childNodes[1].childNodes[1].childNodes[5].childNodes[1]
      .childNodes[3];

  if (transactionRows != undefined && productNameNode != undefined) {
    console.log("List of Transactions: ");
    console.log(transactionRows);
    const transactions = new Array<string>();
    transactionRows.forEach((node) => transactions.push(node.innerHTML));

    const productName = productNameNode?.innerText;
    console.log(productNameNode);
    console.log(productName);

    if ("No Fee Chequing Account" === productName) {
      SimpliiBank.checkings.push(...transactions);
    } else if ("High Interest Savings Account" === productName) {
      SimpliiBank.savings.push(...transactions);
    } else {
      console.log("Transactions not found");
    }
  }
};

// const root = document.createElement("div");
// root.id = "crx-root";
// document.body.appendChild(root);

// ReactDOM.createRoot(root).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// setTimeout(logTransactions, 2500);

// const locationHash = window.location.hash;
// console.log(locationHash);

// if (locationHash.startsWith("#/accounts/deposits/")) {
//   console.log("deposits");
//   // todo
// } else if (locationHash.startsWith("#/accounts/credit-cards/")) {
//   console.log("credit cards");
//   //todo
// }

// const observer = new MutationObserver((mutationsList) => {
//   // This function will be called whenever mutations occur
//   for (const mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       // Check for changes in child nodes (added, removed, or changed)
//       console.log('Child nodes of "account-details" have changed!');
//     } else if (mutation.type === "attributes") {
//       // Check for changes in attributes of the "account-details" element
//       console.log('Attributes of "account-details" have changed!');
//     }
//   }
// });

// const options = {
//   childList: true, // Observe changes in child nodes
//   attributes: true, // Observe changes in attributes
//   subtree: true, // Observe changes within the entiresubtree of the target element
// };

// setTimeout(() => {
//   const targetElement = document.querySelector("div.account-details");

//   if (targetElement) {
//     console.log(targetElement)
//     observer.observe(targetElement, options);
//   }
//   else console.log("target element doesn't exist");
// }, 20);


// function locationHashChanged() {
//   const locationHash = window.location.hash;

//   console.log(location.hash);
//   if (locationHash.startsWith("#/accounts/deposits/")) {
//     console.log("deposits");
//     // todo
//   } else if (locationHash.startsWith("#/accounts/credit-cards/")) {
//     console.log("credit cards");
//     //todo
//   }
// }

// window.onhashchange = locationHashChanged;


// {
//   "js": ["src/content.tsx"],
//   "matches": [
//     "https://www.google.com/*",
//     "https://online.simplii.com/*"
//   ]
// },
// {
//   "js": ["src/simplii/depositsAccounts.tsx"],
//   "matches": [
//     "https://online.simplii.com/ebm-resources/public/client/web/index.html#/accounts/deposits/*"
//   ]
// },
// {
//   "js": ["src/simplii/creditCardsAccounts.tsx"],
//   "matches": [
//     "https://online.simplii.com/ebm-resources/public/client/web/index.html#/accounts/deposits/*"
//   ]
// },
// https://online.simplii.com/ebm-resources/public/client/web/index.html#/accounts/credit-cards/
