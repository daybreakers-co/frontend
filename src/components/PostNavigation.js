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
  <div className="Container PostNavigation">
    {previous &&
      <div className="previous">
        <HeaderCard
          link={`/${username}/${tripId}/${previous.id}`}
          headerCard={previous} />
      </div>
    }
    {next &&
      <div className="next">
        <HeaderCard
        link={`/${username}/${tripId}/${next.id}`}
        headerCard={next} />
      </div>
    }
  </div>
)

PostNavigation.propTypes = {
  postNavigation: propType(PostNavigationFragment).isRequired,
}

export default withRouter(PostNavigation);
