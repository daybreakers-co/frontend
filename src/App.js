import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import { Route, Switch } from 'react-router-dom'

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EditPostPage from './pages/EditPostPage';
import PostPage from './pages/PostPage';
import EditTripPage from './pages/EditTripPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import TripPage from './pages/TripPage';
import DeleteTripPage from './pages/DeleteTripPage';
import DeletePostPage from './pages/DeletePostPage';
import Footer from './components/Footer';

export class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route exact path="/:username/:tripId/edit" component={EditTripPage}/>
          <Route exact path="/:username/:tripId/delete" component={EditTripPage}/>
          <Route exact path="/:username/:tripId/:postId" component={PostPage}/>
          <Route exact path="/:username/:tripId/:postId/edit" component={EditPostPage}/>
          <Route exact path="/:username/:tripId/:postId/delete" component={EditPostPage}/>
          <Route exact path="/:username/:tripId" component={TripPage} />
          <Route exact path="/:username/" component={UserPage} />
        </Switch>
        <Switch>
          <Route exact path="/:username/:tripId/delete" component={DeleteTripPage}/>
          <Route exact path="/:username/:tripId/:postId/delete" component={DeletePostPage}/>
        </Switch>
      </main>
    );
  }
}

export default App
