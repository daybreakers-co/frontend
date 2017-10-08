import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import HeaderCard from '../components/HeaderCard';
import withCurrentUser from '../components/hoc/withCurrentUser'
import Header from '../components/Header'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'

import UserPageQuery from '../graphql/UserPageQuery.gql'
import CreateTripQuery from '../graphql/CreateTripQuery.gql'

class UserPage extends Component {

  handleCreateTripClick = () => {
    const { username, createTripMutation, history } = this.props;

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
          button={user.isViewer && <Button size="small" type="secondary" onClick={this.handleCreateTripClick} title="Create trip" />}/>
        <section className="Container">
          <PageTitle>
            <h1>Trips {user.name} has made</h1>
            <p>{user.name} is keeping track of their trips on daybreakers. You can view trips and posts here!</p>
          </PageTitle>

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
    );
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
