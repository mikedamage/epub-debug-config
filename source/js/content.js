import domready from 'domready';

domready(() => {
  let win = window.window;

  console.log(win);

  if (win.hasEpubDebug) {
    return;
  }

  win.hasEpubDebug = true;

  const actions = {
    getLoggerStatus() {
      console.log(win.logger);

      if (!win.logger) {
        return false;
      }

      return {
        config: win.logger.getConfig(),
        components: win.logger.componentNames
      };
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (!actions.hasOwnProperty(request.action)) {
      console.warn('Received invalid request from extension');
      return;
    }

    let args = request.args || [];

    sendResponse(actions[request.action].apply(this, args));
  });
});
