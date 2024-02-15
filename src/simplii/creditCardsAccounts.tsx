console.log("credit card Account")

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

function parseFinancialData(): FinancialData {
  const financialData: FinancialData = {};
  const creditDetailsSection = document.querySelector('.credit-details');

  if (!creditDetailsSection) {
    console.log('Credit details section not found');
    return financialData
  }

  const creditDetailsList = creditDetailsSection.querySelectorAll('li');


  creditDetailsList.forEach((item: Element) => {
      const label = item.querySelector('.detail-label')?.textContent?.trim() || '';
      const value = item.querySelector('.align-right span')?.textContent?.trim() || '';

      // Remove any non-numeric characters from the value and parse it as a float
      const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));

      financialData[label] = numericValue;
  });

  return financialData;
}

function parseStatementDetails(): StatementData {
  const statementData: StatementData = {};
  const statementDetailsSection = document.querySelector('.statement-details');

  if (!statementDetailsSection) {
      console.log('Statement details section not found');
      return statementData
  }

  const statementDetailsList = statementDetailsSection.querySelectorAll('li');


  statementDetailsList.forEach((item: Element) => {
      const label: string = item.querySelector('.detail-label')?.textContent?.trim() || '';
      const value: string = item.querySelector('.align-right')?.textContent?.trim() || '';

      statementData[label] = value;
  });

  return statementData;
}

export default function parseCreditCardDetails(): CreditCardDetails {
  return {
    creditDetails: parseFinancialData(),
    statementDetails: parseStatementDetails()
  };
}

// try {
//   const statementData: StatementData = parseStatementDetails();
//   console.log(statementData);
// } catch (error) {
//   console.error(error);
// }

