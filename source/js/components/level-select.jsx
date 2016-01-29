import _             from 'lodash';
import React         from 'react';
import ActionCreator from '../actions/action-creator';
import AppStore      from '../stores/app-store';
import DropDownMenu  from 'material-ui/lib/DropDownMenu';
import MenuItem      from 'material-ui/lib/menus/menu-item';

class LevelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { level: 'info' };
  }

  componentDidMount() {
    AppStore.addChangeListener(() => {
      let config = AppStore.getConfig();
      this.setState({ level: config.level });
    });
  }

  handleChange(evt, idx, value) {
    console.log('Severity level set to %s', value);
    ActionCreator.setSeverityLevel(value);
    this.setState({ level: value });
  }

  render() {
    return (
      <div className="level-select">
        <h2>Filtering</h2>
        <span className="level-select__label">Minimum Message Severity</span>
        <DropDownMenu value={this.state.level} onChange={this.handleChange.bind(this)}>
          <MenuItem value="debug" primaryText="Debug" />
          <MenuItem value="info" primaryText="Info" />
          <MenuItem value="warn" primaryText="Warn" />
          <MenuItem value="error" primaryText="Error" />
        </DropDownMenu>
      </div>
    );
  }
}

export default LevelSelect;
