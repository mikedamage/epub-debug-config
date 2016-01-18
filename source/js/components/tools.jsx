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
        <button className="icon refresh" type="button" onClick={this.handleRefresh}>
          <span className="button-inner"></span>
        </button>
      </div>
    );
  }
}

export default Tools;
