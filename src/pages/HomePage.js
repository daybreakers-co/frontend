import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import "./HomePage.css"

class HomePage extends Component {

  render() {
    return (
      <div className="HomePage">
        <div className="Container narrow">
          <img src="./daybreakers-logo.svg" alt="Logo" />
          <h1>Daybreakers</h1>
          <p>We are a community of travellers who want to share their experiences across the world.</p>
          <p>We offer a beautiful and free platform to document and share your amazing trips.</p>
          <Link to="/signin" className="Button large">Sign in!</Link>
          <Link to="/signup" className="Button large white">New? Sign up!</Link>
        </div>
      </div>
    );
  }
}

export default HomePage
