"use strict";

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

/* Initialize the page action: if the url contains a forum id and the user is logged in, show the button. */
function initializePageAction(tab) {
  chrome.pageAction.hide(tab.id);

  if (tab.url.match("slickdeals.net/f/")) {
    //if on a deal page
    chrome.tabs.executeScript(
      tab.id,
      {
        code: 'document.querySelector("#headerUsername").innerHTML'
      },
      results => {
        /* if found element with id #headerUsername, indicating the user is logged in */
        if (results.length > 0) {
          chrome.pageAction.show(tab.id);
          chrome.pageAction.setTitle({
            tabId: tab.id,
            title: "Show Printable Version"
          });
        }
      }
    );
  }
}

chrome.runtime.onInstalled.addListener(function() {
  /* When first loaded, initialize the page action for all tabs.*/
  chrome.tabs.query({}, tabs => {
    for (let tab of tabs) {
      initializePageAction(tab);
    }
  });
});

/* Each time a tab is updated, reset the page action for that tab. */
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    initializePageAction(tab);
  }
});
