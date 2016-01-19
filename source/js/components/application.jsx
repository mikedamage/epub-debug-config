import _             from 'lodash';
import React         from 'react';
import ComponentList from './component-list';
import LevelSelect   from './level-select';
import Tools         from './tools';
import ActionCreator from '../actions/action-creator';
import AppStore      from '../stores/app-store';
import AppBar        from 'material-ui/lib/app-bar';

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

    let styles = { fontSize: '18px' };

    return (
      <div className="application">
        <AppBar
          title="ePublishing Debug Config"
          titleStyle={styles} />
        <Tools />
        <LevelSelect />
        <ComponentList />
      </div>
    );
  }
}

export default Application;
