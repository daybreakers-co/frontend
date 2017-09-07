import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import withCurrentUser from '../components/hoc/withCurrentUser'
import Header from '../components/Header'

import SignUpQuery from '../graphql/SignUpQuery.gql'

class SignupPage extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    emailSubscription: false,
  }

  render () {
    const { isLoggedin } = this.props;

    // redirect if user is logged in
    if (isLoggedin()) {
      this.props.history.push('/')
    }

    return (
      <div>
        <Header />
        <div className='CenteredForm Centered'>
          <form onSubmit={this.createUser}>
            <h3>Welcome!</h3>
            <input
              type="text"
              value={this.state.name}
              placeholder='Your name'
              onChange={(e) => this.setState({name: e.target.value})} />
            <input
              type="text"
              value={this.state.username}
              placeholder='username'
              onChange={(e) => this.setState({username: e.target.value})} />
            <input
              type="text"
              value={this.state.email}
              placeholder='Email'
              onChange={(e) => this.setState({email: e.target.value})} />
            <input
              type='password'
              value={this.state.password}
              placeholder='Password'
              onChange={(e) => this.setState({password: e.target.value})} />

            <button type="submit" disabled={!this.state.name || !this.state.username || !this.state.email || !this.state.password} >Create account</button>
          </form>
      </div>
    </div>
    )
  }

  createUser = (e) => {
    e.preventDefault();

    const {email, password, username, name} = this.state

    this.props.createUser({variables: {email, password, username, name}})
      .then((response) => {
        window.localStorage.setItem(
          'authenticationToken', response.data.createUser.authenticationToken
        )
        this.props.history.push('/')
      }).catch((e) => {
        console.error(e)
      })

  }
}

export default compose(
  graphql(SignUpQuery, {name: 'createUser'}),
  withCurrentUser,
  withRouter
)(SignupPage)
