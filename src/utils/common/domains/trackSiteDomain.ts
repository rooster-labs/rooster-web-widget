const website = {
  tangerine: ["tangerine.ca"],
  simplii: ["simplii.com"],
  pcFinancial: ["pcfinancial.ca"],
  cibc: ["cibc.com"],
  wealthsimple: ["wealthsimple.com"],
  questrade: ["questrade.com"],
  key: ["keyown.com"],
  creditKarma: ["creditkarma.ca"],
  canadaRevenueAgency: ["apps2.ams-sga.cra-arc.gc.ca"],
};

export const getActiveSiteDomain = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const activeUrl = activeTab.url;
    console.log(activeUrl);

    return activeUrl;
  });
};
