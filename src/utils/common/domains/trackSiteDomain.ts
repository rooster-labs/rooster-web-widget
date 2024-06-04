import { findKey } from "lodash";

interface siteMetadata {
  domains: string[];
}

const serviceSiteList = {
  tangerine: ["tangerine.ca"],
  simplii: ["simplii.com"],
  pcFinancial: ["pcfinancial.ca"],
  cibc: ["cibc.com"],
  wealthsimple: ["wealthsimple.com"],
  questrade: ["questrade.com"],
  keyRealEstate: ["keyown.com"],
  creditKarma: ["creditkarma.ca"],
  canadaRevenueAgency: ["apps2.ams-sga.cra-arc.gc.ca"],
};

export const getActiveSiteDomain = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  const activeUrl = activeTab.url;
  return activeUrl;
};

export async function getFinanceWebsite() {
  const currentDomain = await getActiveSiteDomain();
  // const serviceSiteEntries = Object.entries(serviceSiteList);
  if (currentDomain) {
    return findKey(
      serviceSiteList,
      (domainList) => domainList.some((d) => currentDomain.includes(d)),
    );
  } else {
    return undefined;
  }
}
