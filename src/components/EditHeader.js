import React from 'react';

import './Header.css';
import './EditHeader.css';

import "react-toggle/style.css"

class Header extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <nav className="Header edit">
        {children}
      </nav>
    );
  }
}

export default Header;
