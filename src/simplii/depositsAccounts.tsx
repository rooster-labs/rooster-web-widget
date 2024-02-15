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

function getTombstoneText(boxIdx: number, divIdx: number, spanIdx: number): string {
  return (
    document
      .querySelector(
        `.tombstone .box-medium:nth-of-type(${boxIdx}) div:nth-of-type(${divIdx}) span:nth-child(${spanIdx})`
      )
      ?.textContent?.trim() || ""
  );
}

function getTombStoneSmallBoxText(boxIdx: number): string {
  // trim text and remove non-numeric characters
  return (
    document
      .querySelector(`.tombstone .box-small:nth-child(${boxIdx}) em`)
      ?.textContent?.trim()
      ?.replace(/[^0-9.-]+/g, "") || "0"
  );
}

export function parseFinancialInfo(): FinancialInfo {
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

export function getDepAccountTransactions() {
  const transactionRows = document.querySelectorAll("tr.transaction-row");
  const transactions = new Array<string>();
  transactionRows.forEach((node) => transactions.push(node.innerHTML));
  return transactions
}
