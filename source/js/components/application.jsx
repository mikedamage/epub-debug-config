import _             from 'lodash';
import React         from 'react';
import ComponentList from './component-list';
import LevelSelect   from './level-select';
import Tools         from './tools';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggerStatus: this.props.status
    };
  }

  render() {
    if (!this.state.loggerStatus) {
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

    return (
      <div className="application">
        <h2>Application</h2>
        <LevelSelect />
        <ComponentList />
        <Tools />
      </div>
    );
  }
}

Application.propTypes = {
  loggerStatus: React.PropTypes.object
};

export default Application;
