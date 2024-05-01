import { querySelectText } from "../utils.js";

interface FinancialInfo {
  balance: number;
  availableFunds: number;
  productName: string;
  statementOption: string;
  bankCardDesignation: string;
  transitNumber: string;
  institutionNumber: string;
  accountNumber: string;
}

interface Transactions {
  date: string;
  location: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
}

type TransactionData = Array<Transactions>;

function getTombstoneText(
  boxIdx: number,
  divIdx: number,
  spanIdx: number,
): string {
  return querySelectText(
    document,
    `.tombstone .box-medium:nth-of-type(${boxIdx}) div:nth-of-type(${divIdx}) span:nth-child(${spanIdx})`,
  );
}

function getTombStoneSmallBoxText(boxIdx: number): string {
  // trim text and remove non-numeric characters
  return (
    querySelectText(
      document,
      `.tombstone .box-small:nth-child(${boxIdx}) em`,
    )?.replace(/[^0-9.-]+/g, "") || "0"
  );
}

function extractFinancialInfo(): FinancialInfo {
  return {
    balance: parseFloat(getTombStoneSmallBoxText(1)),
    availableFunds: parseFloat(getTombStoneSmallBoxText(2)),
    productName: getTombstoneText(3, 1, 2),
    statementOption: getTombstoneText(3, 2, 2),
    bankCardDesignation: getTombstoneText(3, 3, 2),
    transitNumber: getTombstoneText(4, 1, 2),
    institutionNumber: getTombstoneText(4, 2, 2),
    accountNumber: getTombstoneText(4, 3, 2),
  };
}

// Usage
// const financialInfo = parseFinancialInfo();
// console.log(financialInfo);

function extractDepAccountTransactions(): TransactionData {
  const transactionRows = document.querySelectorAll("tr.transaction-row");
  const transactions = new Array<Transactions>();

  transactionRows.forEach((row) => {
    const date = querySelectText(row, ".date");
    const location = querySelectText(row, ".transactionLocation");
    const description = querySelectText(row, ".transactionDescription");
    const debit = querySelectText(row, ".debit span");
    const credit = querySelectText(row, ".credit span");
    const balance = querySelectText(row, ".balance span");

    transactions.push({
      date: date,
      location: location,
      description: description,
      debit: debit,
      credit: credit,
      balance: balance,
    });
  });

  return transactions;
}

export function logDepositAccountsData() {
  console.log("deposits");
  console.log(extractFinancialInfo());
  console.log(extractDepAccountTransactions());
}
