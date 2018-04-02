import React from 'react'
import PropTypes from 'prop-types'

import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import Toggle from 'react-toggle'

import withCurrentUser from '../components/hoc/withCurrentUser'
import PostAddSection from '../components/post/sections/AddSection'
import PostEditText from '../components/post/sections/text/EditText'
import PostEditPhotoRow from '../components/post/sections/photoRow/EditPhotoRow'
import EditHero from '../components/post/sections/hero/EditHero'
import EditorNavigation from '../components/post/sections/EditorNavigation'
import EditHeader from '../components/EditHeader'
import EditPostHeader from '../components/EditPostHeader'
import EditLocations from '../components/EditLocations'
import LoadingPage from '../components/LoadingPage'
import Map from "../components/Map"
import PostPageQuery from '../graphql/PostPageQuery.gql'
import UpdatePostQuery from '../graphql/UpdatePostQuery.gql'
import CreateEmptySectionQuery from '../graphql/CreateEmptySectionQuery.gql'
import CreateLocationQuery from '../graphql/CreateLocationQuery.gql'
import DeleteLocationQuery from '../graphql/DeleteLocationQuery.gql'

import './PostPage.css'
import "react-toggle/style.css"
import 'react-dates/lib/css/_datepicker.css'

class EditPostPage extends React.Component {
  state = {
    sections: [],
    focusedInput: null
  }

  static propTypes = {
    router: PropTypes.object,
    updateMutation: PropTypes.func,
    data: PropTypes.object,
  }

  handleChange = (params) => {
    let post = this.props.data.user.post;
    let postId = post.id;
    let username = this.props.data.user.username

    this.props.updateMutation({
      variables: {
        id: postId,
        title: params.title || post.title,
        subtitle: params.subtitle || post.subtitle,
        startDate: params.startDate || post.startDate,
        endDate: params.endDate || post.endDate,
        published: params.published === undefined ? post.published : params.published
      },
      // After receiving mutated data from the server, update the cache
      update: (proxy, { data: { updatePost } }) => {
        let data = postDataByUsernameAndIdFromProxy(username, postId, proxy);
        data.user.post = updatePost;
        proxy.writeQuery({ query: PostPageQuery, data});
      },
    })
  }

  handleAddSection = (sectionType) => {
    let postId = this.props.data.user.post.id;
    let username = this.props.data.user.username

    this.props.createSectionMutation({
      variables: {
        postId: postId,
        type: sectionType
      },
      update: (proxy, { data: { createEmptySection } }) => {
        let data = postDataByUsernameAndIdFromProxy(username, postId, proxy);
        data.user.post.sections.push(createEmptySection)
        proxy.writeQuery({ query: PostPageQuery, data});
      },
    })
  }

  handleCreateLocation = (location) => {
    let postId = this.props.data.user.post.id;
    let username = this.props.data.user.username

    this.props.createLocationMutation({
      variables: {
        postId: postId,
        title: location.title,
        lat: location.lat,
        lng: location.lng
      },
      update: (proxy, { data: { createLocation } }) => {
        let data = postDataByUsernameAndIdFromProxy(username, postId, proxy);
        data.user.post.locations.push(createLocation)
        proxy.writeQuery({ query: PostPageQuery, data});
      },
    })
  }

  handleDeleteLocation = (location) => {
    let postId = this.props.data.user.post.id
    let username = this.props.data.user.username
    let id = location.id

    this.props.deleteLocationMutation({
      variables: {
        postId: postId,
        id: id,
      },
      update: (proxy, { data: { createLocation } }) => {
        let data = postDataByUsernameAndIdFromProxy(username, postId, proxy);
        data.user.post.locations = data.user.post.locations.filter(loc => loc.id !== id)
        proxy.writeQuery({ query: PostPageQuery, data});
      },
    })
  }

  render () {
    const { data: { error, loading, user }, match: { params: { username, tripId, postId } } } = this.props

    if (error)   { return (<div>ERROR: {error}</div>) }
    if (loading) { return (<LoadingPage />) }

    let post = user.post;
    let sortedSections = post.sections.map(s => s).sort((a, b) => { return a.index - b.index });
    let sectionsIndex = sortedSections.map(s => s.id);

    let sections = sortedSections.map((section, idx) => {
      let sectionComponent
      switch (section.__typename) {
        case 'PhotoRowSection':
          sectionComponent = <PostEditPhotoRow
            username={username}
            postId={postId}
            {...section} />
          break;
        case 'HeroSection':
          sectionComponent = <EditHero
            username={username}
            postId={postId}
            {...section} />
          break;
        default:
          sectionComponent = <PostEditText
            username={username}
            postId={postId}
            {...section} />
      }

      return (
        <EditorNavigation
          key={section.id}
          id={section.id}
          index={idx}
          postId={postId}
          username={username}
          sectionsLength={sectionsIndex.length}
          sectionsIndex={sectionsIndex}
          __typename={section.__typename}
        >
          {sectionComponent}
        </EditorNavigation>
      )
    });

    return (
      <div className="PostPage">
        <EditHeader>
          <div className="EditOptions">
            <div className="toggle">
              <Toggle
                defaultChecked={post.published}
                onChange={(event)=> this.handleChange({published: event.target.checked})}
              /> {post.published ? "published" : "unpublished"}
            </div>
          </div>
          <ul className="UserActions">
            <Link className="Button small" to={`/${username}/${tripId}/${postId}`}>Finish editing</Link>
            <Link className="Button small destructive" to={`/${username}/${tripId}/${postId}/delete`}>Delete post</Link>
          </ul>
        </EditHeader>
        <EditPostHeader
          title={post.title}
          subtitle={post.subtitle}
          header={post.header}
          startDate={post.startDate}
          endDate={post.endDate}
          uploadParentId={post.id}
          uploadParentType="Post"
          onChange={this.handleChange}
          />
        <EditLocations
          locations={post.locations}
          onCreate={this.handleCreateLocation}
          onDelete={this.handleDeleteLocation} />
        {post.locations.length > 0 &&
          <Map locations={post.locations} />
        }
        <section className="PostSections">
          {sections}
        </section>
        <PostAddSection
          username={username}
          postId={postId}
          handleClick={this.handleAddSection} />
      </div>
    )
   }
}

export function postDataByUsernameAndIdFromProxy(username, postId, proxy) {
  return proxy.readQuery({
    query: PostPageQuery,
    variables: {
      id: postId,
      username: username
    }
  })
}

export default compose(
  graphql(UpdatePostQuery, {name: 'updateMutation'}),
  graphql(CreateEmptySectionQuery, {name: 'createSectionMutation'}),
  graphql(CreateLocationQuery, {name: 'createLocationMutation'}),
  graphql(DeleteLocationQuery, {name: 'deleteLocationMutation'}),
  graphql(PostPageQuery, {
    options: (ownProps) => ({
      variables: {
        id:       ownProps.match.params.postId,
        username: ownProps.match.params.username
      }
    })
  }),
  withCurrentUser,
  withRouter
)(EditPostPage);
