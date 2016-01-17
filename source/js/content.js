import includes from 'lodash.includes';


const storageKey = 'epublishing.logger';
const getConfig  = () => JSON.parse(window.window.localStorage[storageKey]);
const saveConfig = config => window.window.localStorage[storageKey] = JSON.stringify(config);

const actions    = {
  getLoggerConfig() {
    try {
      return getConfig();
    } catch (err) {
      return { status: 'error', message: 'error getting config', data: err };
    }
  },

  getLocalStorage(key) {
    return window.window.localStorage[key];
  },

  enableComponent(name) {
    let config = getConfig();

    if (!includes(config.components, name)) {
      return { status: 'error', message: `invalid component name: ${name}`, data: null };
    }

    config.active.push(name);
    window.window.localStorage[storageKey] = JSON.stringify(config);

    return { status: 'success', data: config };
  },

  setComponentState(component, active) {
    let config = getConfig();

    if (!includes(config.components, component)) {
      return { status: 'error', message: `Invalid component name: ${component}`, data: null };
    }

    if (active && !includes(config.active, component)) {
      config.active.push(component);
      console.debug('Enabled component: %s (%O)', component, config);
    } else if (!active && includes(config.active, component)) {
      let idx = config.active.indexOf(component);

      if (idx !== -1) {
        config.active.splice(idx, 1);
        console.debug('Disabled component: %s (%O)', component, config);
      }
    }

    saveConfig(config);

    return { status: 'success', data: config };
  },

  setSeverityLevel(level) {
    console.debug('Setting logger severity level to %s', level);
    let config = getConfig();
    config.level = level;
    saveConfig(config);

    return { status: 'success', data: config };
  },

  setLoggerConfig(config) {
    config = JSON.stringify(config);
    window.window.localStorage[storageKey] = config;
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
