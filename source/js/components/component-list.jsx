import _             from 'lodash';
import React         from 'react';
import Toggle        from 'react-toggle';
import ActionCreator from '../actions/action-creator';

class ComponentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      components: {}
    };
  }

  componentDidMount() {
    let config = AppStore.getConfig();
    let toggles = {};

    _.forEach(config.components, comp => {
      toggles[comp] = _.includes(config.active, comp);
    });

    this.setState({ components: toggles });
  }

  handleChange(evt) {
    console.log(evt);
  }

  render() {
    let components = _.map(this.state.components, (comp, key) => {
      return (
        <div className="component-list__component">
          <Toggle id={`component-${key}`} defaultChecked={comp} onChange={this.handleChange} />
          <label for={`component-${key}`}>{key}</label>
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
