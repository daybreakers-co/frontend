import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import Button from '../components/Button'

import Modal from '../components/Modal'

import DeleteTripPageQuery from '../graphql/DeleteTripPageQuery.gql'
import DeleteTripQuery from '../graphql/DeleteTripQuery.gql'
import UserPageQuery from '../graphql/UserPageQuery.gql'

class DeleteTripPage extends Component {
  handleDeleteClick = () => {
    const {
      history,
      deleteMutation,
      match: { params: { tripId, username } }
    } = this.props

    deleteMutation({
      variables: {tripId},
      update: (proxy, _) => {
        let data = proxy.readQuery({query: UserPageQuery, variables: {username: username}})
        data.user.trips = data.user.trips.filter(trip => trip.id !== tripId)
        proxy.writeQuery({ query: UserPageQuery, data });
      }
    }).then((result) => {
      history.push(`/${username}`)
    })
  }

  back = (e) => {
    e.stopPropagation()
    this.props.history.goBack()
  }

  render() {
    const { data: { loading, error, user } } = this.props;
    if (error)   { return (<div>ERROR: {error}</div>) }
    if (loading) { return (<div>Loading...</div>)     }

    return (
      <Modal onClose={this.back}>
        <h1>Delete trip</h1>
        {user.trip.posts.length === 0 ? (
          <p>This trip has no posts, looks alright to delete!</p>
        ) : (
          <p>This trip has <strong>{user.trip.posts.length}</strong> posts, are you sure you want to delete it?
          </p>
        )}
        <Button type="destructive" title="Delete Trip" onClick={this.handleDeleteClick} />
        <Button type="secondary" title="Never mind" onClick={this.back} />
      </Modal>
    );
  }
}

export default compose(
  graphql(DeleteTripPageQuery, {
    options: (ownProps) => ({
      variables: {
        username: ownProps.match.params.username,
        tripId: ownProps.match.params.tripId
      }
    })
  }),
  graphql(DeleteTripQuery, {name: 'deleteMutation'}),
  withRouter
)(DeleteTripPage);
