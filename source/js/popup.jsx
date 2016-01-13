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

executeScript('js/content.js').then(results => {
  console.log('injected content script');
});
