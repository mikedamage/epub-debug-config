import Dispatcher    from '../dispatcher/app-dispatcher';
import * as util     from '../lib/utilities';
import {ActionTypes} from '../lib/constants';

const ActionCreator = {
  getLoggerConfig() {
    return util.getCurrentTab().then(tab => {
      return sendMessage(tab.id, { action: 'getLoggerConfig' });
    }).then(config => {
      Dispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        config: config
      });

      return status;
    });
  }
};

export default ActionCreator;
