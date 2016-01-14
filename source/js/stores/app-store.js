import AppDispatcher    from '../dispatcher/app-dispatcher';
import { ActionTypes }  from '../lib/constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class AppStore extends EventEmitter {
  constructor() {
    super();
    this.state = {};
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.emitChange();
    return this.state;
  }
}

AppStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.TOGGLE_COMPONENT:

      break;
    case ActionTypes.SET_LEVEL:

      break;
    case ActionTypes.TOGGLE_AJAX:

      break;
  }
});

export default AppStore;
