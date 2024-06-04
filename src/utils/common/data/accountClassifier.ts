// TODO: Create a deposit types Set. Then a seperate Map for type to classifier
export const depositTypesClassifier = {
  chequing: ["chequing", "cash"],
  crypto: ["crypto"],
  fhsa: ["fhsa"],
  rrsp: ["rrsp", "rsp"],
  savings: ["savings"],
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

// const depositClassifier = new Set([
//   "chequing",
//   "crypto",
//   "fhsa",
//   "rrsp",
//   "rsp",
//   "savings",
//   "tfsa",
//   "non-registered",
// ]);

// const rrspClassifier = new Set(["rrsp", "rsp"]);

// const creditClassifier = new Set([
//   "credit card",
//   "loan",
//   "line of credit",
//   "secured line of credit",
//   "visa",
//   "mastercard",
//   "american express",
// ]);

// const creditCardClassifier = new Set([
//   "visa",
//   "mastercard",
//   "american express",
// ]);

// export function findAllAccountType(accountName: string): string[] {
//   const lowerCaseName = accountName.toLowerCase();
//   const accountTypeList = new Array<string>();
//   let isDeposit = false;

//   depositClassifier.forEach((c) => {
//     if (lowerCaseName.includes(c)) {
//       if (rrspClassifier.has(c)) {
//         accountTypeList.push("rrsp");
//       } else {
//         accountTypeList.push(c);
//       }
//       isDeposit = true;
//     }
//   });

//   if (lowerCaseName == "cash") {
//     accountTypeList.push("chequing");
//     isDeposit = true;
//   }

//   if (!isDeposit) {
//     creditClassifier.forEach((c) => {
//       if (lowerCaseName.includes(c)) {
//         if (creditCardClassifier.has(c)) {
//           accountTypeList.push("credit card");
//         } else {
//           accountTypeList.push(c);
//         }
//       }
//     });
//   }

//   return accountTypeList;
// }
