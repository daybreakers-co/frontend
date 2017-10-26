import React from 'react';

import './Dates.css';

class Dates extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="Dates">
        {children}
      </div>
    );
  }
}

export default Dates;
