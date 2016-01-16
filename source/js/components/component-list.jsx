import _             from 'lodash';
import React         from 'react';
import Toggle        from 'react-toggle';
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
      console.debug('Component list: change callback');

      let config = AppStore.getConfig();
      let toggles = {};

      _.forEach(config.components, comp => {
        toggles[comp] = _.includes(config.active, comp);
      });

      this.setState({ components: toggles });
    };

    changeCallback();
    AppStore.addChangeListener(changeCallback);
  }

  handleChange(evt) {
    console.debug('Component toggled: %O', evt.target);
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
