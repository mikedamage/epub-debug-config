import _                    from 'lodash';
import Q                    from 'q';
import React                from 'react';
import ReactDOM             from 'react-dom';
import Application          from './components/application';
import * as util            from './lib/utilities';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const logErrors = err => console.error(err);

util.executeScript('js/content.js').then(results => {
  console.log('injected content script: %O', results);
  return results;
}, logErrors).then(results => {
  ReactDOM.render(<Application />, document.getElementById('app'));
}, logErrors);
