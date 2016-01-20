import _             from 'lodash';
import React         from 'react';
import ComponentList from './component-list';
import LevelSelect   from './level-select';
import ActionCreator from '../actions/action-creator';
import AppStore      from '../stores/app-store';
import AppBar        from 'material-ui/lib/app-bar';
import IconButton    from 'material-ui/lib/icon-button';
import Divider       from 'material-ui/lib/divider';

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
    let barStyles   = { backgroundColor: '#1eb57d' };
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
        <div className="component">
          <LevelSelect />
        </div>
        <div className="component">
          <Divider />
        </div>
        <div className="component">
          <ComponentList />
        </div>
      </div>
    );
  }
}

export default Application;
