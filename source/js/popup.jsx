import _        from 'lodash';
import Q        from 'q';
import React    from 'react';
import ReactDOM from 'react-dom';
import util     from './lib/util';

util.executeScript('js/content.js').then(results => {
  console.log('injected content script');
});
