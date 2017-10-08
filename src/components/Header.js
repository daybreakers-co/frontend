import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Header.css';

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
    const { button, currentUser, user, trip, post } = this.props;

    if (Array.isArray(button)) {
      content = button
    } else {
      content = [<li key="Button">{button}</li>]
    }
    if (currentUser) {
      content.push(<li key="signOut"><a title="Sign out" onClick={this._logout}><i className="fa fa-sign-out" aria-hidden="true"></i>
</a></li>)

    } else {
      content.push(<li key="signIn"><Link to="/signin">Sign in</Link></li>)
      content.push(<li key="signUp"><Link to="/signup">Sign Up</Link></li>)
    }
    return (
      <nav className="Header">
        <a className="Title" href="/">
          <img src="/daybreakers-logo.svg" alt="Daybreakers logo"/>
          Daybreakers
        </a>
        <ul className="BreadCrumbs">
          {user &&
            <li>
              <Link to={`/${user.username}`}>{user.username}</Link>
            </li>
          }
          {user && trip &&
            <li>
              <Link to={`/${user.username}/${trip.id}`}>{trip.title}</Link>
            </li>
          }
          {user && trip && post &&
            <li>
              <Link to={`/${user.username}/${trip.id}/${post.id}`}>{post.title}</Link>
            </li>
          }
        </ul>
        <ul className="UserActions">
          {content}
        </ul>
      </nav>
    );
  }
}

export default Header;
