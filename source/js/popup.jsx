import _           from 'lodash';
import Q           from 'q';
import React       from 'react';
import ReactDOM    from 'react-dom';
import Application from './components/application';
import * as util   from './lib/utilities';

util.executeScript('js/content.js').then(results => {
  console.log('injected content script');
  return util.getCurrentTab();
}).then(tab => {
  console.log('Current Tab: %O', tab);
  return util.sendMessage(tab.id, { action: 'getLoggerStatus' });
}).then(status => {
  console.log(status);
  ReactDOM.render(<Application status={status.data} />, document.getElementById('app'));
});

