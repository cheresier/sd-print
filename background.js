"use strict";

chrome.runtime.onInstalled.addListener(function() {
      chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlMatches: "/f/" },
              css: ["a[id='headerUsername']"]
            })
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
        }
      ]);
    });
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === "complete" && tab.url.match(/f/)) {
//     chrome.pageAction.show(tabId);
//   } else {
//     chrome.pageAction.hide(tabId);
//   }
// });

chrome.pageAction.onClicked.addListener(function(tab) {
  var myRegexp = /\/f\/(\d*)-/g;
  var match = myRegexp.exec(tab.url);
  var threadId = match[1];
  if (threadId) {
    chrome.tabs.update(tab.id, {
      url: "https://slickdeals.net/forums/printthread.php?t=" + threadId
    });
  }
});
