import _             from 'lodash';
import React         from 'react';
import ActionCreator from '../actions/action-creator';

class LevelSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(evt) {
    let level = evt.target.value;
    ActionCreator.setSeverityLevel(level);
  }

  render() {
    let opts = {
      'debug' : 'Debug',
      'info'  : 'Info',
      'warn'  : 'Warn',
      'error' : 'Error'
    };

    opts = _.map(opts, (label, val) => {
      return (
        <option key={val} value={val}>{label}</option>
      );
    });

    return (
      <div className="level-select">
        <label htmlFor="level-select-input" className="level-select__label">Severity Level</label>
        <div className="field">
          <select
            className="level-select__input"
            id="level-select-input"
            name="level"
            onChange={this.handleChange}>{opts}</select>
        </div>
      </div>
    );
  }
}

export default LevelSelect;
