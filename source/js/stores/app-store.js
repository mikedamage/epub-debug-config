import AppDispatcher    from '../dispatcher/app-dispatcher';
import { ActionTypes }  from '../lib/constants';
import { EventEmitter } from 'events';

class AppStore extends EventEmitter {
  constructor() {
    super();
  }
}

AppStore.dispatchToken = AppDispatcher.register(action => {

});

export default AppStore;
