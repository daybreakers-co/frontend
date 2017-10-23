import React from 'react'
import { propType } from 'graphql-anywhere';
import { withRouter } from 'react-router-dom'

import PostCard from './PostCard'

import PostNavigationFragment from '../graphql/_PostNavigation.gql'

import './PostNavigation.css'

const PostNavigation = ({
  match: { params: { username, tripId } },
  postNavigation: { previous, next, trip }
}) => (
  <div className="PostNavigation">
    <h1 className="H-Large">More posts from {trip.title}</h1>
    <div className="Container">
      {previous &&
        <PostCard
          link={`/${username}/${tripId}/${previous.id}`}
          post={previous}
          size="small"
          label="previous" />
      }
      {next &&
          <PostCard
        link={`/${username}/${tripId}/${next.id}`}
        post={next}
        size="small"
        label="next" />
      }
    </div>
  </div>
)

PostNavigation.propTypes = {
  postNavigation: propType(PostNavigationFragment).isRequired,
}

export default withRouter(PostNavigation);
