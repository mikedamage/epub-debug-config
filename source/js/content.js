if (!window.hasEpubDebug) {
  window.hasEpubDebug = true;

  const actions = {
    getLoggerStatus() {
      return { components: [], level: 'debug' };
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (!actions.hasOwnProperty(request.action)) {
      console.warn('Received invalid request from extension');
      return;
    }

    sendResponse(actions[request.action].apply(this, request.args));
  });
}
