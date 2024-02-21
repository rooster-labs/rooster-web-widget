import { querySelectText } from "../utils";

interface AccountSummary {
  accountName: string;
  balance: string;
}

type AccountSummaryList = Array<AccountSummary>;

export function parseAccountSummary(): AccountSummaryList {
  const accountSummaryList = new Array<AccountSummary>();
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
          balance: querySelectText(row, ".balance"),
        });
      }
    })
  );

  return accountSummaryList;
}

function onLoad() {
  setTimeout(() => {
    console.log("Simplii Summary Page");
    console.log(parseAccountSummary());
  }, 2000);
}

onLoad();
