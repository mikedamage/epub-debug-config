import Q from 'q';

export const getTab = () => {
  let deferred = Q.defer();
  chrome.tabs.getCurrent(tabID => deferred.resolve(tabID));
  return deferred.promise;
};

export const executeScript = filename => {
  let deferred = Q.defer();
  chrome.tabs.executeScript(null, { file: filename }, result => {
    deferred.resolve(result);
  });
  return deferred.promise;
};
