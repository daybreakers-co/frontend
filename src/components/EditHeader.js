import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Toggle from 'react-toggle'

import './Header.css';
import './EditHeader.css';
import './DayPicker.css';

import "react-toggle/style.css"

class Header extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    button: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('authenticationToken')
    window.location.reload()
  }

  render() {
    let content;
    const { button, currentUser, user, trip, post, children } = this.props;

    return (
      <nav className="Header edit">

        <div className="EditOptions">

          <div className="dates">
            <label><i className="fa fa-calendar" /></label>
            <input className="small" value="Today" />
          </div>

          <div className="locations">
            <label><i className="fa fa-map-marker" /></label>
            <input className="small" placeholder="Find locations" />
            <div className="tag">
              Amsterdam <i className="fa fa-times" />
            </div>
          </div>


          <div className="toggle">
            <Toggle /> Published
          </div>
        </div>

        <ul className="UserActions">
          {button}
        </ul>
      </nav>
    );
  }
}

export default Header;
