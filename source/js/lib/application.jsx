import _     from 'lodash';
import React from 'react';

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
        <p>
          <em>
            Logger module not found in active tab
          </em>
        </p>
      );
    }

    return (
      <div className="application">
        <h2>Application</h2>
      </div>
    );
  }
}

Application.propTypes = {
  loggerStatus: React.PropTypes.object
};

export default Application;
