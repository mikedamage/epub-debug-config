import _             from 'lodash';
import React         from 'react';
import ActionCreator from '../actions/action-creator';
import DropDownMenu  from 'material-ui/lib/DropDownMenu';
import MenuItem      from 'material-ui/lib/menus/menu-item';

const levelOpts = {
  'debug' : 'Debug',
  'info'  : 'Info',
  'warn'  : 'Warn',
  'error' : 'Error'
};

class LevelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { level: 'info' };
  }

  handleChange(evt) {
    let level = evt.target.value;
    ActionCreator.setSeverityLevel(level);
    this.state.level = level;
  }

  render() {
    opts = _.map(levelOpts, (label, val) => {
      return <MenuItem value={val} primaryText={label} />;
    });

    return (
      <div className="level-select">
        <label htmlFor="level-select-input" className="level-select__label">Severity Level</label>
        <DropDownMenu value={this.state.level} onChange={this.handleChange}>
          {opts}
        </DropDownMenu>
      </div>
    );
  }
}

export default LevelSelect;
