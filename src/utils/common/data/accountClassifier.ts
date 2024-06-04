// TODO: Create an AI powered Classifier

export const depositTypesClassifier = {
  chequing: ["chequing", "cash"],
  crypto: ["crypto"],
  fhsa: ["fhsa"],
  rrsp: ["rrsp", "rsp"],
  savings: ["savings", "non-registered"],
  tfsa: ["tfsa"],
} as const;

export const creditTypeClassifier = {
  "credit card": [
    "visa",
    "mastercard",
    "american express",
    "amex",
    "credit card",
    "cash back",
  ],
  "loan": ["loan"],
  "line of credit": ["line of credit"],
  "secured line of credit": ["secured line of credit"],
  "prepaid card": ["prepaid card"],
  "gift card": ["gift card"],
} as const;

export type AccountTypes =
  | keyof typeof depositTypesClassifier
  | keyof typeof creditTypeClassifier
  | "";

// Don't change order of credit and deposit because of credit card classifier
export const accountTypeClassifier = {
  ...creditTypeClassifier,
  ...depositTypesClassifier,
};

export function findAccountType(accountName: string): AccountTypes {
  const lowerCaseName = accountName.toLowerCase();
  const classifiers = Object.entries(accountTypeClassifier);

  for (const [accountType, classifier] of classifiers) {
    if (classifier.some((c) => lowerCaseName.includes(c))) {
      return accountType as AccountTypes;
    }
  }
  return "";
}

const investmentAccountClassifier = new Set([
  "unregistered",
  "gic",
  "trading",
  "investing",
  "stocks",
  "etfs",
  "bonds",
]);

export function isInvestmentAccount(accountName: string) {
  return investmentAccountClassifier.has(accountName);
}
