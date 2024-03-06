const mathuBankSavings = {
  accountName: "Mathu Bank Account",
  balance: "$1000",
};

const MY_FINANCIAL_DATA_DB = "myFinancialData;";

const mockBankAccounts: { [accountName: string]: any } = {
  "Checking Account": {
    accountName: "Checking Account",
    cash: "$10,000",
    marketValue: "N/A",
    totalEquity: "$10,000",
  },
  "Savings Account": {
    accountName: "Savings Account",
    cash: "$5,000",
    marketValue: "N/A",
    totalEquity: "$5,000",
  },
};

chrome.runtime.onInstalled.addListener(() => {
  storeBankAccountData();
});

async function storeBankAccountData() {
  await chrome.storage.local.set(mockBankAccounts);
  console.log("Bank account data stored in local storage");
  // Print all stored data
  chrome.storage.local.get(null, (data) => {
    console.log("Stored data:", data);
  });
}
