import Dispatcher    from '../dispatcher/app-dispatcher';
import * as util     from '../lib/utilities';
import {ActionTypes} from '../lib/constants';

const ActionCreator = {
  getLoggerConfig() {
    return util.getCurrentTab().then(tab => {
      return sendMessage(tab.id, { action: 'getLoggerStatus' });
    }).then(status => {
      Dispatcher.dispatch({
        type: ActionTypes.SET_STATE,
        state: status
      });

      return status;
    });
  }
};

export default ActionCreator;
