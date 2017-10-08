import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import HeaderCard from '../components/HeaderCard'
import withCurrentUser from '../components/hoc/withCurrentUser'
import Header from '../components/Header'
import Button from '../components/Button'

import UserPageQuery from '../graphql/UserPageQuery.gql'
import CreateTripQuery from '../graphql/CreateTripQuery.gql'

class UserPage extends Component {

  handleCreateTripClick = () => {
    const { match, createTripMutation, history } = this.props
    const username = match.params.username

    createTripMutation({variables: {username}}).then((result) => {
      history.push(`/${username}/${result.data.createTrip.id}/edit`)
    })
  }

  render() {
    const { currentUser, data: { loading, error, user } } = this.props
    if (error)   { return (<div>ERROR: {error}</div>) }
    if (loading) { return (<div>Loading...</div>)     }
    return (
      <div>
        <Header
          currentUser={currentUser}
          user={user}
          button={user.isViewer && <Button size="small" onClick={this.handleCreateTripClick} title="Create trip" />}/>
        <section className="Container">
          <h1>{user.isViewer ? "These are your own trips!" : `Trips ${user.name} has made`}</h1>
          <div style={{flex: 1}} >
            {user.trips.map((trip) => (
              <HeaderCard
                key={trip.id}
                link={`/${user.username}/${trip.id}`}
                headerCard={trip}/>
            ))}
          </div>
        </section>
      </div>
    )
  }
}

export default compose(
  graphql(
    UserPageQuery, {
      options: (ownProps) => ({
        variables: {username: ownProps.match.params.username}
      })
    }
  ),
  graphql(CreateTripQuery, {name: 'createTripMutation'}),
  withCurrentUser,
  withRouter,
)(UserPage)
