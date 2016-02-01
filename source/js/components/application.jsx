import _              from 'lodash';
import React          from 'react';
import ComponentList  from './component-list';
import LevelSelect    from './level-select';
import AjaxControl    from './ajax-control';
import ActionCreator  from '../actions/action-creator';
import AppStore       from '../stores/app-store';
import AppBar         from 'material-ui/lib/app-bar';
import IconButton     from 'material-ui/lib/icon-button';
import Divider        from 'material-ui/lib/divider';
import ThemeManager   from 'material-ui/lib/styles/theme-manager';
import IconMenu       from 'material-ui/lib/menus/icon-menu';
import MenuItem       from 'material-ui/lib/menus/menu-item';
import Theme          from '../lib/theme';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ActionCreator.getLoggerConfig().then(cfg => {
      let changeHandler = () => {
        let config    = AppStore.getConfig();
        let iconState = !!config.active.length ? 'on' : 'off';

        console.log('setting icon, on: %s', !!config.active.length);
        chrome.browserAction.setIcon({ path: `images/debug-${iconState}-19.png` })
      }

      changeHandler();
      AppStore.addChangeListener(changeHandler);
    });
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    };
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

    let titleStyles  = { fontSize: '18px' };
    let refresh      = <IconButton iconClassName="icon icon-refresh" iconStyle={{fontSize: '18px'}} />;
    let clickRefresh = evt => {
      ActionCreator.getLoggerConfig();
    };

    return (
      <div className="application">
        <AppBar
          title="ePublishing Debug Config"
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
        <div className="component">
          <AjaxControl />
        </div>
      </div>
    );
  }
}

Application.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default Application;
