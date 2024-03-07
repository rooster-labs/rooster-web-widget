import { querySelectNumber, querySelectText } from "../utils";

function parseSummaryOfInvestingAccounts(): Account[] {
  const accountSummaryList: Account[] = [];
  const activeAccountListDiv = document.querySelector(".active-accounts-list");
  const accountRows = activeAccountListDiv?.querySelectorAll(".account-row");

  accountRows?.forEach((row) => {
    accountSummaryList.push({
      accountName: querySelectText(row, ".account-name"),
      cash: querySelectNumber(row, ".col-cash div:nth-child(2)"),
      marketValue: querySelectNumber(row, ".col-market-value div:nth-child(2)"),
      balance: querySelectNumber(row, ".col-total-equity div:nth-child(2)"),
    });
  });

  return accountSummaryList.filter((a) => a.accountName !== "All accounts");
}

function createQuestradeProduct(): Product {
  return {
    name: "Questrade",
    type: "broker",
    accounts: parseSummaryOfInvestingAccounts(),
  };
}

function onLoad() {
  setTimeout(() => {
    console.log("Questrade Summary Page");
    const questradeData = createQuestradeProduct();
    chrome.storage.local.set({questrade: questradeData});
    console.log(questradeData);
  }, 10000);
}

onLoad();
