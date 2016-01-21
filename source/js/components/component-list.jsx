import _             from 'lodash';
import React         from 'react';
import ActionCreator from '../actions/action-creator';
import AppStore      from '../stores/app-store';
import Toggle        from 'material-ui/lib/toggle';
import List          from 'material-ui/lib/lists/list';
import ListItem      from 'material-ui/lib/lists/list-item';

class ComponentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      components: {}
    };
  }

  componentDidMount() {
    console.debug(this.context.muiTheme);

    let changeCallback = () => {
      console.log('Component list: change callback');

      let config = AppStore.getConfig();
      let toggles = {};

      console.debug(config);

      _.forEach(config.components, comp => {
        let active    = _.includes(config.active, comp);
        toggles[comp] = active;
        console.debug('Component: %s: %s', comp, active);
      });

      console.debug('Set state: %O', toggles);
      this.setState({ components: toggles });
    };

    changeCallback();
    AppStore.addChangeListener(changeCallback.bind(this));
  }

  handleChange(evt, toggled) {
    console.log('Component toggled: %O', evt.target);
    ActionCreator.toggleComponent(evt.target.name, toggled);
  }

  render() {
    let components = _.map(this.state.components, (comp, key) => {
      let toggle = <Toggle
                    defaultToggled={comp}
                    name={key}
                    onToggle={this.handleChange.bind(this)} />;
      return (
        <ListItem key={key} primaryText={key} rightToggle={toggle} />
      );
    });

    return (
      <div className="component-list">
        <h2>Components</h2>
        <List>
          {components}
        </List>
      </div>
    );
  }
}

export default ComponentList;
