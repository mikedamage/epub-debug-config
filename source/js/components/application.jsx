import _             from 'lodash';
import React         from 'react';
import ComponentList from './component-list';
import LevelSelect   from './level-select';
import ActionCreator from '../actions/action-creator';
import AppStore      from '../stores/app-store';
import AppBar        from 'material-ui/lib/app-bar';
import IconButton    from 'material-ui/lib/icon-button';

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
    let refresh     = <IconButton iconClassName="icon icon-refresh" iconStyle={{fontSize: '18px'}} />;
    let clickRefresh = evt => {
      ActionCreator.getLoggerConfig();
    }

    return (
      <div className="application">
        <AppBar
          title="ePublishing Debug Config"
          style={barStyles}
          titleStyle={titleStyles}
          iconElementRight={refresh}
          onClick={clickRefresh} />
        <LevelSelect />
        <ComponentList />
      </div>
    );
  }
}

export default Application;
