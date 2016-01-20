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

    let titleStyles = { fontSize: '18px' };
    let barStyles   = { backgroundColor: '#3b5e8a' };

    return (
      <div className="application">
        <AppBar
          title="ePublishing Debug Config"
          style={barStyles}
          titleStyle={titleStyles} />
        <Tools />
        <LevelSelect />
        <ComponentList />
      </div>
    );
  }
}

export default Application;
