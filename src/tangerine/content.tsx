import { querySelectNumber, querySelectText } from "../utils";

function parseAccountSummary(): Account[] {
  const accountSummaryList = new Array<Account>();
  const tangerineAccounts = document.querySelector(".tangerine-accounts");
  const accountRows = tangerineAccounts?.querySelectorAll(".desktop-container");

  accountRows?.forEach((row) => {
    accountSummaryList.push({
      accountName: querySelectText(
        row,
        ".account-info span:nth-child(2) span:nth-child(2)"
      ),
      balance: querySelectNumber(row, ".account-balance span:nth-child(2)"),
    });
  });

  return accountSummaryList;
}

function createTangerineProduct(): Product {
  return {
    name: "Tangerine",
    type: "bank",
    accounts: parseAccountSummary(),
  };
}

function onLoad() {
  setTimeout(() => {
    console.log("Tangerine Summary Page");
    const tangerine = createTangerineProduct();
    chrome.storage.local.set({tangerine: tangerine});
    console.log(tangerine);
  }, 2000);
}

onLoad();
