import _        from 'lodash';
import Q        from 'q';
import React    from 'react';
import ReactDOM from 'react-dom';

const executeScript = filename => {
  let deferred = Q.defer();
  chrome.tabs.executeScript(null, { file: filename }, result => {
    deferred.resolve(result);
  });
  return deferred.promise;
};

const getCurrentTab = () => {
  let deferred = Q.defer();
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    deferred.resolve(tabs[0]);
  });
  return deferred.promise;
};

const sendMessage = (tabID, message) => {
  let deferred = Q.defer();
  chrome.tabs.sendMessage(tabId, message, response => deferred.resolve(response));
  return deferred.promise;
};

executeScript('js/content.js').then(results => {
  console.log('injected content script');

  getCurrentTab().then(tabID => {
    sendMessage(tabID, { action: 'getLoggerStatus' }).then(loggerStatus => {
      console.log(loggerStatus);
    });
  });
});
