import { querySelectText } from "../utils";

interface AccountSummary {
  accountName: string;
  balance: string;
}

type AccountSummaryList = Array<AccountSummary>;

function parseAccountSummary(): AccountSummaryList {
  const accountSummaryList = new Array<AccountSummary>();
  const tangerineAccounts = document.querySelector(".tangerine-accounts");
  const accountRows = tangerineAccounts?.querySelectorAll(".desktop-container");

  accountRows?.forEach((row) => {
    accountSummaryList.push({
      accountName: querySelectText(
        row,
        ".account-info span:nth-child(2) span:nth-child(2)"
      ),
      balance: querySelectText(row, ".account-balance span:nth-child(2)"),
    });
  });

  return accountSummaryList;
}

function onLoad() {
  setTimeout(() => {
    console.log("Tangerine Summary Page");
    console.log(parseAccountSummary());
  }, 2000);
}

onLoad();
