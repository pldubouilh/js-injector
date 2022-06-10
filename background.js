chrome.tabs.onUpdated.addListener(  (tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete') {
    chrome.tabs.get(tabId, (tab) => {
      chrome.storage.sync.get(null, (v) => {
        const url = new URL(tab.url);
        if (v[url.host] != undefined) {
          chrome.tabs.executeScript(tabId, {code: v[url.host]});
        }
      });
    });
  }
})
