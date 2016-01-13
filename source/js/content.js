import includes from 'lodash.includes';

const storageKey = 'epublishing.logger';
const actions    = {
  getLoggerStatus() {
    return JSON.parse(window.window.localStorage[storageKey]);
  },
  getLocalStorage(key) {
    return window.window.localStorage[key];
  },
  enableComponent(name) {
    let config = JSON.parse(window.window.localStorage[storageKey]);

    if (!includes(config.components, name)) {
      return { status: 'error', message: 'invalid component name', data: null };
    }

    config.active.push(name);
    window.window.localStorage[storageKey] = JSON.stringify(config);

    return { status: 'success', data: config };
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (!actions.hasOwnProperty(request.action)) {
    console.warn('Received invalid request from extension');
    return;
  }

  let args = request.args || [];

  sendResponse({ data: actions[request.action].apply(this, args) });
});
