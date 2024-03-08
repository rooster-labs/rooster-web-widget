import { querySelectNumber, querySelectText } from "../utils";

function parseAccountSummary(): Account[] {
  const accountSummaryList = new Array<Account>();
  const allAccounts = [
    document.querySelectorAll(".items__list table.DEPOSIT tr.ember-view"),
    document.querySelectorAll(".items__list table.CREDIT tr.ember-view"),
  ];

  allAccounts.forEach((account) =>
    account?.forEach((row) => {
      const accountName = querySelectText(row, ".account-name");
      if (accountName != "") {
        accountSummaryList.push({
          accountName: querySelectText(row, ".account-name"),
          balance: querySelectNumber(row, ".balance"),
        });
      }
    })
  );

  return accountSummaryList;
}

function createSimpliiProduct(): Product {
  return {
    name: "Simplii",
    type: "bank",
    accounts: parseAccountSummary(),
  };
}

export function logAccountSummary() {
  console.log("Simplii Summary Page");
  const simpliiSummaryData = createSimpliiProduct();
  chrome.storage.local.set({ simplii: simpliiSummaryData });
  console.log(simpliiSummaryData);
}
