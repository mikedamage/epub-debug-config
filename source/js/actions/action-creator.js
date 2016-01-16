import AppDispatcher from '../dispatcher/app-dispatcher';
import * as util     from '../lib/utilities';
import {ActionTypes} from '../lib/constants';

const ActionCreator = {
  getLoggerConfig() {
    return util.getCurrentTab().then(tab => {
      console.log('Current tab: %O', tab);
      return util.sendMessage(tab.id, { action: 'getLoggerConfig' });
    }).then(config => {
      console.debug('Send config data to dispatcher: %O', config);

      AppDispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        config: config.data
      });

      return config.data;
    });
  },

  setLoggerConfig(config) {
    return util.getCurrentTab().then(tab => {
      console.log('Current tab: %O', tab);
      return util.sendMessage(tab.id, { action: 'setLoggerConfig', args: [ config ] });
    }).then(config => {
      console.debug('Send config data to dispatcher: %O', config);

      AppDispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        config: config.data
      });

      return config.data;
    })
  }
};

export default ActionCreator;
