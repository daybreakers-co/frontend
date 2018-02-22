import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import TripCard from '../components/TripCard'
import withCurrentUser from '../components/hoc/withCurrentUser'
import Header from '../components/Header'
import Button from '../components/Button'
import LoadingPage from '../components/LoadingPage'

import UserPageQuery from '../graphql/UserPageQuery.gql'
import CreateTripQuery from '../graphql/CreateTripQuery.gql'

import './UserPage.css'

class UserPage extends Component {

  handleCreateTripClick = () => {
    const { match, createTripMutation, history } = this.props
    const username = match.params.username

    createTripMutation(
      {variables: { username }, refetchQueries: ['UserPageQuery']}
    ).then((result) => {
      history.push(`/${username}/${result.data.createTrip.id}/edit`)
    })
  }

  render() {
    const { currentUser, data: { loading, error, user } } = this.props
    if (error)   { return (<div>ERROR: {error}</div>) }
    if (loading) { return (<LoadingPage />) }
    return (
      <div>
        <Header
          currentUser={currentUser}
          user={user}
          button={user.isViewer && <Button size="small" onClick={this.handleCreateTripClick} title="Create trip" />}/>
        <section className="UserPage">
          {user.trips.map((trip) => (
            <TripCard
              key={trip.id}
              link={`/${user.username}/${trip.id}`}
              trip={trip}
            />
          ))}
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
