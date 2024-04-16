import { querySelectText } from "../utils.js";

interface StatementData {
  [label: string]: string | number;
}

interface FinancialData {
  [label: string]: number;
}

export interface CreditCardDetails {
  creditDetails: FinancialData;
  statementDetails: StatementData;
}

function extractFinancialData(): FinancialData {
  const financialData: FinancialData = {};
  const creditDetailsSection = document.querySelector(".credit-details");

  if (!creditDetailsSection) {
    console.log("Credit details section not found");
    return financialData;
  }

  const creditDetailsList = creditDetailsSection.querySelectorAll("li");

  creditDetailsList.forEach((row: Element) => {
    const label = querySelectText(row, ".detail-label");
    const value = querySelectText(row, ".align-right span");

    // Remove any non-numeric characters from the value and parse it as a float
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));

    financialData[label] = numericValue;
  });

  return financialData;
}

function extractStatementDetails(): StatementData {
  const statementData: StatementData = {};
  const statementDetailsSection = document.querySelector(".statement-details");

  if (!statementDetailsSection) {
    console.log("Statement details section not found");
    return statementData;
  }

  const statementDetailsList = statementDetailsSection.querySelectorAll("li");

  statementDetailsList.forEach((row: Element) => {
    const label = querySelectText(row, ".detail-label");
    const value = querySelectText(row, ".align-right");

    statementData[label] = value;
  });

  return statementData;
}

function extractCreditCardDetails(): CreditCardDetails {
  return {
    creditDetails: extractFinancialData(),
    statementDetails: extractStatementDetails(),
  };
}

export function logCreditCardData() {
  console.log("credit cards");
  console.log(extractCreditCardDetails());
}
