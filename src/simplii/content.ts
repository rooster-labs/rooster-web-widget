import { SimpliiAccountSummaryExtractor } from "./AccountSummaryExtractor";
import { logCreditCardData } from "./creditCardsAccounts";
import { logDepositAccountsData } from "./depositsAccounts";

function locationHashChanged() {
  const locationHash = window.location.hash;

  console.log("Simplii content script", location.hash);

  setTimeout(() => {
    if (locationHash.startsWith("#/accounts")) {
      if (locationHash.startsWith("#/accounts/deposits/")) {
        logDepositAccountsData();
      } else if (locationHash.startsWith("#/accounts/credit-cards/")) {
        logCreditCardData();
      } else {
        new SimpliiAccountSummaryExtractor().onLoad()
      }
    }
  }, 4000);
}

locationHashChanged()

window.onhashchange = locationHashChanged;
