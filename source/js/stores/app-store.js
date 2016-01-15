import _                from 'lodash';
import AppDispatcher    from '../dispatcher/app-dispatcher';
import { ActionTypes }  from '../lib/constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _config = {};

const AppStore = _.assign({}, EventEmitter.prototype, {
  getConfig() {
    return _config;
  },

  setConfig(obj) {
    return _config = obj;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatchToken: AppDispatcher.register(action => {
    switch (action.type) {
      case ActionTypes.SET_STATE:
        this.setConfig(action.config);
        break;
    }

    return true;
  })
});

export default AppStore;
