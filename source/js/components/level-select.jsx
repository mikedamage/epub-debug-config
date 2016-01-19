import _             from 'lodash';
import React         from 'react';
import ActionCreator from '../actions/action-creator';
import DropDownMenu  from 'material-ui/lib/DropDownMenu';
import MenuItem      from 'material-ui/lib/menus/menu-item';

class LevelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { level: 'info' };
  }

  handleChange(evt, idx, value) {
    console.log('Severity level set to %s', value);
    ActionCreator.setSeverityLevel(value);
    this.setState({ level: value });
  }

  render() {
    return (
      <div className="level-select">
        <label htmlFor="level-select-input" className="level-select__label">Severity Level</label>
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
