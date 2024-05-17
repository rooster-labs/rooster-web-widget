import {
  extractAccountValues,
  XPathMap,
} from "../content-scripts/ObjectScrapper.js";
import {
  Account,
  AccountDetails,
  findAllAccountType,
} from "../data/AccountSummaryData.js";
import { AccountSummaryExtractor } from "../data/AccountSummaryExtractor.js";
import { querySelectNumber, querySelectText } from "../utils.js";

class WealthSimpleAccountSummaryExtractor extends AccountSummaryExtractor {
  name = "WealthSimple";

  extractAccountDetails(): Account[] {
    const accountSummaryList = accountSummaryXPaths.map((xMap) =>
      extractAccountValues(xMap)
    );

    return accountSummaryList;
  }
}

new WealthSimpleAccountSummaryExtractor().onLoad(5000);

const accountSummaryXPaths: XPathMap<AccountDetails>[] = [
  {
    accountName:
      "/html/body/div[1]/ws-card-loading-indicator/div/div/div/div/ng-transclude/div/layout/div/div[1]/react-router/span/div[2]/div[2]/div/main/div/div/div[1]/div[9]/div[2]/div[1]/div/div/div[1]/div/p",
    balance:
      "/html/body/div[1]/ws-card-loading-indicator/div/div/div/div/ng-transclude/div/layout/div/div[1]/react-router/span/div[2]/div[2]/div/main/div/div/div[1]/div[9]/div[2]/div[1]/div/div/div[2]/p",
  },
  {
    accountName:
      "/html/body/div[1]/ws-card-loading-indicator/div/div/div/div/ng-transclude/div/layout/div/div[1]/react-router/span/div[2]/div[2]/div/main/div/div/div[1]/div[9]/div[2]/div[2]/div/div/div[1]/div/p",
    balance:
      "/html/body/div[1]/ws-card-loading-indicator/div/div/div/div/ng-transclude/div/layout/div/div[1]/react-router/span/div[2]/div[2]/div/main/div/div/div[1]/div[9]/div[2]/div[2]/div/div/div[2]/p[1]",
  },
  {
    accountName:
      "/html/body/div[1]/ws-card-loading-indicator/div/div/div/div/ng-transclude/div/layout/div/div[1]/react-router/span/div[2]/div[2]/div/main/div/div/div[1]/div[9]/div[2]/div[3]/div/div/div[1]/div/p",
    balance:
      "/html/body/div[1]/ws-card-loading-indicator/div/div/div/div/ng-transclude/div/layout/div/div[1]/react-router/span/div[2]/div[2]/div/main/div/div/div[1]/div[9]/div[2]/div[3]/div/div/div[2]/p",
  },
];
