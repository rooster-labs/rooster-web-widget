import { logAccountSummary } from "./accountSummary";
import { logCreditCardData } from "./creditCardsAccounts";
import { logDepositAccountsData } from "./depositsAccounts";

function locationHashChanged() {
  const locationHash = window.location.hash;

  console.log(location.hash);

  setTimeout(() => {
    if (locationHash.startsWith("#/accounts")) {
      if (locationHash.startsWith("#/accounts/deposits/")) {
        logDepositAccountsData();
      } else if (locationHash.startsWith("#/accounts/credit-cards/")) {
        logCreditCardData();
      } else {
        logAccountSummary();
      }
    }
  }, 2000);
}

window.onhashchange = locationHashChanged;
