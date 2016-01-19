import _             from 'lodash';
import React         from 'react';
import ActionCreator from '../actions/action-creator';
import AppStore      from '../stores/app-store';

class ComponentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      components: {}
    };
  }

  componentDidMount() {
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

  handleChange(evt) {
    console.log('Component toggled: %O', evt.target);
    ActionCreator.toggleComponent(evt.target.name, evt.target.checked);
  }

  render() {
    let components = _.map(this.state.components, (comp, key) => {
      return (
        <div className="component-list__component" key={key}>
          <h2 className="section-title">Components</h2>
          <label htmlFor={`component-${key}`}>{key}</label>
          <Toggle
            id={`component-${key}`}
            defaultChecked={comp}
            onChange={this.handleChange}
            name={key} />
        </div>
      );
    });

    return (
      <div className="component-list">
        {components}
      </div>
    );
  }
}

export default ComponentList;
