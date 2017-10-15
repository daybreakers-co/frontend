import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import Button from '../components/Button'

import Modal from '../components/Modal'

import DeletePostQuery from '../graphql/DeletePostQuery.gql'
import DeletePostPageQuery from '../graphql/DeletePostPageQuery.gql'
import TripPageQuery from '../graphql/TripPageQuery.gql'

class DeletePostPage extends Component {

  handleDeleteClick = () => {
    const {
      history,
      deleteMutation,
      match: { params: { tripId, postId, username } }
    } = this.props

    deleteMutation({
      variables: {postId},
      update: (proxy, _) => {
        let data = proxy.readQuery({ query: TripPageQuery, variables: { username: username, tripId: tripId } })
        data.user.trip.posts = data.user.trip.posts.filter(post => post.id !== postId)
        proxy.writeQuery({ query: TripPageQuery, data });
      }
    }).then((result) => {
      history.push(`/${username}/${tripId}`)
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
        <h1>Delete post</h1>
        <p>Are you sure you want to delete "{user.post.title || 'Untitled'}"?</p>
        <Button type="destructive" size="large" title="Delete Post" onClick={this.handleDeleteClick} />
        <Button type="secondary" size="large" title="Never mind" onClick={this.back} />
      </Modal>
    );
  }
}

export default compose(
  graphql(DeletePostPageQuery, {
  options: (ownProps) => ({
    variables: {
      username: ownProps.match.params.username,
      postId: ownProps.match.params.postId
    }
  })
  }),
  graphql(DeletePostQuery, {name: 'deleteMutation'}),
  withRouter
)(DeletePostPage);
