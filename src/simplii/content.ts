/// <reference lib="dom" />
import getXPath from "get-xpath";
import { SimpliiAccountSummaryExtractor } from "./AccountSummaryExtractor.js";
import { logCreditCardData } from "./creditCardsAccounts.js";
import { logDepositAccountsData } from "./depositsAccounts.js";

function locationHashChanged() {
  const locationHash = window.location.hash;

  console.log("Simplii content script", location.hash);
  console.log("Vithu in da house");

  setTimeout(() => {
    if (locationHash.startsWith("#/accounts")) {
      if (locationHash.startsWith("#/accounts/deposits/")) {
        logDepositAccountsData();
      } else if (locationHash.startsWith("#/accounts/credit-cards/")) {
        logCreditCardData();
      } else {
        new SimpliiAccountSummaryExtractor().onLoad();
      }
    }
  }, 4000);
}

locationHashChanged();

window.onhashchange = locationHashChanged;

////////////////////////////////////////////////////////////////////////

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const path = getXPath(target)
  // const elem = target.getPath()
  console.log({target, path});
  const findElemAgain = getElementByXpath(path)
  console.log("Finding elem using path", findElemAgain)

  event.preventDefault(); // Prevent default actions for better visualization
  event.stopPropagation(); // Stop the event from bubbling up
}, true); // Use capturing instead of bubbling

document.addEventListener("mouseover", (event) => {
  event.target.style.outline = "2px solid red";
});

document.addEventListener("mouseout", (event) => {
  event.target.style.outline = "";
});


function getElementByXpath(path: string) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}