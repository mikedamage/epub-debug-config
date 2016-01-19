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
        <a className="icon refresh" href="#" onClick={this.handleRefresh}>
          <span className="button-inner"></span>
        </a>
      </div>
    );
  }
}

export default Tools;
