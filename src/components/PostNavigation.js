import React from 'react'
import { propType } from 'graphql-anywhere';
import { withRouter } from 'react-router-dom'

import HeaderCard from './HeaderCard'

import PostNavigationFragment from '../graphql/_PostNavigation.gql'

import './PostNavigation.css'

const PostNavigation = ({
  match: { params: { username, tripId } },
  postNavigation: { previous, next }
}) => (
  <div className="PostNavigation">
    <h1 className="H-Large">More posts from {tripId}</h1>
    <div className="Container">
      {previous &&
        <HeaderCard
          link={`/${username}/${tripId}/${previous.id}`}
          headerCard={previous}
          size="small"
          label="previous" />
      }
      {next &&
        <HeaderCard
        link={`/${username}/${tripId}/${next.id}`}
        headerCard={next}
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
