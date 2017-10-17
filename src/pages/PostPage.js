import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { filter } from 'graphql-anywhere';

import withCurrentUser from '../components/hoc/withCurrentUser'
import ShowPhotoRow from '../components/post/sections/photoRow/ShowPhotoRow'
import ShowText from '../components/post/sections/text/ShowText'
import ShowHero from '../components/post/sections/hero/ShowHero'
import Header from '../components/Header'
import HeroHeader from '../components/HeroHeader'
import PostNavigation from '../components/PostNavigation'

import ShowPostQuery from '../graphql/PostPageQuery.gql'
import PostNavigationFragment from '../graphql/_PostNavigation.gql'
import PhotoRowFragment from '../graphql/_ShowPhotoRow.gql'
import TextFragment from '../graphql/_ShowText.gql'
import HeroFragment from '../graphql/_ShowHero.gql'

class PostPage extends React.Component {

  static propTypes = {
    router: PropTypes.object,
    updateMutation: PropTypes.func,
    data: PropTypes.object,
  }

  render () {
    if (this.props.data.loading) { return (<div>Loading</div>) }
    if (this.props.data.error)   { return (<div>ERROR: {this.props.data.error}</div>) }

    const { currentUser, data: { user }, location: { pathname } } = this.props
    const post = user.post;

    let sections = post.sections.map((section, idx) => {
      let sectionComponent
      switch (section.__typename) {
        case 'PhotoRowSection':
          sectionComponent = <ShowPhotoRow
            key={section.id}
            photoRowSection={filter(PhotoRowFragment, section)}/>
          break;
        case 'HeroSection':
          sectionComponent = <ShowHero
            key={section.id}
            heroSection={filter(HeroFragment, section)}/>
          break;
        default:
          sectionComponent = <ShowText
            key={section.id}
            textSection={filter(TextFragment, section)}/>
          break;
      }

      return sectionComponent
    });

    return (
      <div>
        <Header
          currentUser={currentUser}
          user={user}
          trip={post.trip}
          post={post}
          button={user.isViewer && <Link className="Button primary small"  to={`${pathname}/edit`}>Edit post</Link>}/>
        <HeroHeader
          image={post.header}
          title={post.title}
          subtitle={post.subtitle} />
        {sections}
        <PostNavigation
          postNavigation={filter(PostNavigationFragment, post)} />
      </div>
    )
   }
}

export default compose(
  graphql(ShowPostQuery, {
    options: (ownProps) => ({
      fetchPolicy: 'network-only',
      variables: {
        username: ownProps.match.params.username,
        id: ownProps.match.params.postId
      }
    })
  }),
  withCurrentUser,
  withRouter
)(PostPage)
