import _           from 'lodash';
import Q           from 'q';
import React       from 'react';
import ReactDOM    from 'react-dom';
import Application from './components/application';
import * as util   from './lib/utilities';

util.executeScript('js/content.js').then(results => {
  console.log('injected content script: %O', results);
  return results;
}).then(results => {
  ReactDOM.render(<Application />, document.getElementById('app'));
}, function(err) {
  console.error(err);
});
