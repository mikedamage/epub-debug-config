import AppDispatcher from '../dispatcher/app-dispatcher';
import * as util     from '../lib/utilities';
import {ActionTypes} from '../lib/constants';

const ActionCreator = {
  getLoggerConfig() {
    return util.getCurrentTab().then(tab => {
      console.debug('Current tab: %O', tab);
      return util.sendMessage(tab.id, { action: 'getLoggerConfig' });
    }).then(config => {
      console.log('Send config data to dispatcher: %O', config);

      AppDispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        config: config.data
      });

      return config.data;
    });
  },

  setLoggerConfig(config) {
    return util.getCurrentTab().then(tab => {
      console.debug('Current tab: %O', tab);
      return util.sendMessage(tab.id, { action: 'setLoggerConfig', args: [ config ] });
    }).then(config => {
      console.log('Send config data to dispatcher: %O', config);

      AppDispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        config: config.data
      });

      return config.data;
    })
  },

  toggleComponent(component, active) {
    console.log('Toggle component: %s %s', component, active);

    return util.getCurrentTab().then(tab => {
      return util.sendMessage(tab.id, { action: 'setComponentState', args: [ component, active ] });
    }).then(config => {
      console.log('Send config data to dispatcher: %O', config);

      AppDispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        config: config.data
      });

      return config.data;
    });
  },

  setSeverityLevel(level) {
    console.log('Setting severity level to %s', level);

    return util.getCurrentTab().then(tab => {
      return util.sendMessage(tab.id, { action: 'setSeverityLevel', args: [ level ] });
    }).then(config => {
      console.log('Sending config data to dispatcher: %O', config);

      AppDispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        config: config.data
      });

      return config.data;
    });
  }
};

export default ActionCreator;
