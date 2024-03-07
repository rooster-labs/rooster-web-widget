import { parseAccountSummary, createSimpliiProduct } from "./accountSummary";
import parseCreditCardDetails from "./creditCardsAccounts";
import {
  getDepAccountTransactions,
  parseFinancialInfo,
} from "./depositsAccounts";

function locationHashChanged() {
  const locationHash = window.location.hash;

  console.log(location.hash);

  if (locationHash.startsWith("#/accounts")) {
    if (locationHash.startsWith("#/accounts/deposits/")) {
      setTimeout(() => {
        console.log("deposits");
        console.log(parseFinancialInfo());
        console.log(getDepAccountTransactions());
      }, 2000);
      // todo
    } else if (locationHash.startsWith("#/accounts/credit-cards/")) {
      setTimeout(() => {
        console.log("credit cards");
        console.log(parseCreditCardDetails());
      }, 2000);
      //todo
    } else {
      setTimeout(() => {
        console.log("Simplii Summary Page");
        const simpliiSummaryData = createSimpliiProduct();
        chrome.storage.local.set({simplii: simpliiSummaryData});
        console.log(simpliiSummaryData);
      }, 2000);
    }
  }
}

window.onhashchange = locationHashChanged;
