import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {

  render() {
    return (
      <div className="Centered">
        <div className="Container Content narrow align-left">
          <h1><img src="./logo.png" width="40px" alt="Logo" /></h1>
          <p>Daybreakers is a community of travellers who want to share their experiences across the world.</p>
          <p>Already a Daybreaker? <Link to="/signin">sign in!</Link></p>
        </div>
      </div>
    );
  }
}

export default HomePage
