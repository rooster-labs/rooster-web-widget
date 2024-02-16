import { querySelectText } from "../utils";

interface InvestmentAccountSummary {
  accountName: string;
  cash: string;
  marketValue: string;
  totalEquity: string;
}

type AccountSummaryList = Array<InvestmentAccountSummary>;

function parseSummaryOfInvestingAccounts() {
  const accountSummaryList: AccountSummaryList = [];
  const activeAccountListDiv = document.querySelector(".active-accounts-list");
  const accountRows = activeAccountListDiv?.querySelectorAll(".account-row");

  accountRows?.forEach((row) => {
    accountSummaryList.push({
      accountName: querySelectText(row, ".account-name"),
      cash: querySelectText(row, ".col-cash div:nth-child(2)"),
      marketValue: querySelectText(row, ".col-market-value div:nth-child(2)"),
      totalEquity: querySelectText(row, ".col-total-equity div:nth-child(2)"),
    });
  });

  return accountSummaryList;
}

function onLoad() {
  setTimeout(() => {
    console.log("Questrade Summary Page");
    console.log(parseSummaryOfInvestingAccounts());
  }, 10000);
}

onLoad();
