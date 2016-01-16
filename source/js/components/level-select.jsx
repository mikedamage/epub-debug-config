import _     from 'lodash';
import React from 'react';

class LevelSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(evt) {
    console.log(evt);
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
        <select
          className="level-select__input"
          name="level"
          onChange={this.handleChange}>{opts}</select>
      </div>
    );
  }
}

export default LevelSelect;
