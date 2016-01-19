import _             from 'lodash';
import React         from 'react';
import ComponentList from './component-list';
import LevelSelect   from './level-select';
import Tools         from './tools';
import ActionCreator from '../actions/action-creator';
import AppStore      from '../stores/app-store';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ActionCreator.getLoggerConfig();
  }

  render() {
    if (!AppStore.getConfig()) {
      return (
        <div className="application">
          <p className="error">
            <em>
              Logger module not found in active tab
            </em>
          </p>
        </div>
      );
    }

    return (
      <div className="application">
        <Tools />
        <LevelSelect />
        <ComponentList />
      </div>
    );
  }
}

export default Application;
