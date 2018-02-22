import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import withCurrentUser from '../components/hoc/withCurrentUser'
import PostCard from '../components/PostCard'
import Header from '../components/Header'
import Button from '../components/Button'
import TripHeader from '../components/TripHeader'
import LoadingPage from '../components/LoadingPage'

import CreatePostQuery from '../graphql/CreatePostQuery.gql'
import TripPageQuery from '../graphql/TripPageQuery.gql'

import './TripPage.css'

class TripPage extends Component {

  handleCreatePostClick = () => {
    const { history, match: { params: { tripId }}, data: { user: { username }}, createPostMutation} = this.props
    createPostMutation({ variables: { tripId }, refetchQueries: ['TripPageQuery']}).then((result) => {
      history.push(`/${username}/${tripId}/${result.data.createPost.id}/edit`)
    })
  }

  render() {
    const { currentUser, data: { loading, error, user } } = this.props;
    if (error)   { return (<div>ERROR: {error}</div>) }
    if (loading) { return (<LoadingPage />) }

    let posts = user.trip.posts.map((post) => {
      return <PostCard
        key={post.id}
        link={`/${user.username}/${user.trip.id}/${post.id}`}
        post={post} />
    })

    return (
      <div className="TripPage">
        <Header
          user={user}
          trip={user.trip}
          currentUser={currentUser}
          button={!user.isViewer ? [] :
            [
              <li key="createButton"><Button size="small" onClick={this.handleCreatePostClick} title="Create post" /></li>,
              <li key="editButton"><Link to={`/${user.username}/${user.trip.id}/edit`} className="Button small secondary">Edit trip</Link></li>
            ]
          }/>
        <TripHeader
          title={user.trip.title}
          subtitle={user.trip.subtitle}
          startDate={user.trip.startDate}
          endDate={user.trip.endDate}
        />
        <section className="Container">
          <div style={{flex: 1}}>
            {posts}
          </div>
        </section>
      </div>
    );
  }
}

export default compose(
  graphql(TripPageQuery, {
    options: (ownProps) => ({
      variables: {
        username: ownProps.match.params.username,
        tripId: ownProps.match.params.tripId
      }
    }),
  }),
  graphql(CreatePostQuery, {name: 'createPostMutation'}),
  withCurrentUser,
  withRouter
)(TripPage);
