import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Toggle from 'react-toggle'

import './Header.css';
import './EditHeader.css';

import "react-toggle/style.css"

class Header extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <nav className="Header edit">
        {this.props.children}
      </nav>
    );
  }
}

export default Header;
