import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import withCurrentUser from '../components/hoc/withCurrentUser'
import Header from '../components/Header'

import "./HomePage.css"

class HomePage extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="HomePage">
          <div className="Container narrow">
            <h1 className="H-Large">Sharing travels.<br /> Beautiful and free.</h1>
            <p className="T-Large">Daybreakers is a beautiful and free platform to document and share your amazing travels. We invite fellow travellers to share their photos, stories and experiences with the world.</p>
            <Link to="/signin" className="Button large">Sign in!</Link>
            <Link to="/signup" className="Button large white">New? Sign up!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage
