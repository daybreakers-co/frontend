import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import withCurrentUser from '../components/hoc/withCurrentUser'
import Header from '../components/Header'

import SigninUserQuery from '../graphql/SignInQuery.gql'

class LoginPage extends React.Component {

  state = {
    email: '',
    password: '',
  }

  render () {
    const { isLoggedin, currentUser } = this.props;

    // redirect if user is logged in
    if (isLoggedin()) {
      this.props.history.push(`/${currentUser.username}`)
    }

    return (
      <div>
        <Header />
        <div className='CenteredForm Centered'>
          <form onSubmit={this.signinUser}>
            <h3>Welcome back!</h3>

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

            <button type="submit" disabled={!this.state.email || !this.state.password} >Log in</button>
          </form>
        </div>
      </div>
    )
  }

  signinUser = (e) => {
    e.preventDefault();

    const {email, password} = this.state

    this.props.signinUser({variables: {email, password}})
      .then((response) => {
        window.localStorage.setItem('authenticationToken', response.data.signinUser.authenticationToken)
          window.location.reload()
      }).catch((e) => {
        console.error(e)
      })
  }
}


export default compose(
  graphql(SigninUserQuery, {name: 'signinUser'}),
  withCurrentUser,
  withRouter
)(LoginPage)
