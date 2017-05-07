/* global chrome */

import Q from 'q';

export const executeScript = filename => {
  let deferred = Q.defer();
  chrome.tabs.executeScript(null, { file: filename }, result => {
    deferred.resolve(result);
  });
  return deferred.promise;
};

export const getCurrentTab = () => {
  let deferred = Q.defer();
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    deferred.resolve(tabs[0]);
  });
  return deferred.promise;
};

export const sendMessage = (tabID, message) => {
  let deferred = Q.defer();
  chrome.tabs.sendMessage(tabID, message, response => deferred.resolve(response));
  return deferred.promise;
};
