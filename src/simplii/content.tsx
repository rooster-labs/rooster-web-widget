function getDepositProductName() {
  const depositDetailsNode = document.querySelector("div.deposit-details");
  const productNameNode =
    depositDetailsNode?.childNodes[1].childNodes[1].childNodes[5].childNodes[1]
      .childNodes[3];
  return productNameNode?.textContent ?? undefined;
}

function getDepAccountTransactions() {
  const transactionRows = document.querySelectorAll("tr.transaction-row");
  const transactions = new Array<string>();
  transactionRows.forEach((node) => transactions.push(node.innerHTML));
  return transactions
}

function getCreditCardDetail() {
  const creditCardDetails = document.querySelectorAll("div.card-details-info");
  return creditCardDetails
}



function locationHashChanged() {
  const locationHash = window.location.hash;

  console.log(location.hash);
  
  if (locationHash.startsWith("#/accounts/deposits/")) {
    console.log("deposits");
    setTimeout(() => {
      console.log(getDepositProductName() ?? "Deposit name not Found")
      console.log(getDepAccountTransactions())
    }, 2000)
    // todo
  } else if (locationHash.startsWith("#/accounts/credit-cards/")) {
    setTimeout(() => {
      console.log(getCreditCardDetail() ?? "Deposit name not Found")
    }, 2000)
    console.log("credit cards");
    //todo
  }
}

window.onhashchange = locationHashChanged;
