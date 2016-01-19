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
        <a className="icon icon-refresh" href="#" onClick={this.handleRefresh}>
        </a>
      </div>
    );
  }
}

export default Tools;
