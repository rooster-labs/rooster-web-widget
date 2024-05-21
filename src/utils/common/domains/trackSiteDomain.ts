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

export const getFinanceWebsite = async () => {
  let activeFinancialSite;
  const currentDomain = await getActiveSiteDomain();

  if (currentDomain) {
    const siteKeyList = Object.keys(serviceSiteList);

    for (let num = 0; num < Object.keys(serviceSiteList).length; num += 1) {
      const siteName = siteKeyList[num];
      const siteList =
        serviceSiteList[siteName as keyof typeof serviceSiteList];
      for (let num = 0; num < siteList?.length; num += 1) {
        const baseUrl = siteList[num];
        const regex = new RegExp(baseUrl); //`/${baseUrl}/g`;

        if (regex.test(currentDomain)) {
          activeFinancialSite = siteName;

          return siteName;
        }
      }
    }
  }

  return activeFinancialSite;
};
