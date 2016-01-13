import _     from 'lodash';
import React from 'react';

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      loggerStatus: this.props.status
    };
  }

  render() {
    if (!this.state.loggerStatus) {
      return (
        <div className="application">
          <p>
            <em>Logger instance not found</em>
          </p>
        </div>
      );
    }

    return (
      <div className="application"></div>
    );
  }
}

Application.propTypes = {
  loggerStatus: React.PropTypes.object
};

export default Application;
