import React from 'react';

class Wrapper extends React.Component {
  render() {
    return (
      <div className="component">
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;
