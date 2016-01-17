import React         from 'react';
import ActionCreator from '../actions/action-creator';

class Tools extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRefresh(evt) {
    ActionCreator.getLoggerConfig();
  }

  render() {
    return (
      <div className="tools">
        <button className="refresh" type="button" onClick={this.handleRefresh}>Refresh</button>
      </div>
    );
  }
}

export default Tools;
