import React from 'react'
import PropTypes from 'prop-types'

import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import DayPicker from 'react-day-picker'

import withCurrentUser from '../components/hoc/withCurrentUser'
import PostAddSection from '../components/post/sections/AddSection'
import PostEditText from '../components/post/sections/text/EditText'
import PostEditPhotoRow from '../components/post/sections/photoRow/EditPhotoRow'
import EditHero from '../components/post/sections/hero/EditHero'
import EditorNavigation from '../components/post/sections/EditorNavigation'
import Header from '../components/Header'
import EditHeroHeader from '../components/EditHeroHeader'
import EditLocations from '../components/EditLocations'
import Button from '../components/Button'

import PostPageQuery from '../graphql/PostPageQuery.gql'
import UpdatePostQuery from '../graphql/UpdatePostQuery.gql'
import CreateEmptySectionQuery from '../graphql/CreateEmptySectionQuery.gql'
import CreateLocationQuery from '../graphql/CreateLocationQuery.gql'
import DeleteLocationQuery from '../graphql/DeleteLocationQuery.gql'

import 'react-day-picker/lib/style.css'

class EditPostPage extends React.Component {
  state = {
    sections: []
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
        publishDate: params.publishDate || post.publishDate,
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
    const { currentUser, data: { error, loading, user }, match: { params: { username, tripId, postId } } } = this.props

    if (loading) { return (<div>Loading</div>) }
    if (error)   { return (<div>ERROR: {error}</div>) }

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
        >
          {sectionComponent}
        </EditorNavigation>
      )
    });

    return (
      <div>
        <Header
          currentUser={currentUser}
          user={user}
          trip={post.trip}
          post={post}
          button={user.isViewer && <Link className="Button small destructive" to={`/${username}/${tripId}/${postId}/delete`}>Delete post</Link>} />
        <div className="Container full header EditPost">
          <EditHeroHeader
            title={post.title}
            subtitle={post.subtitle}
            header={post.header}
            uploadParentId={post.id}
            uploadParentType="Post"
            onChange={this.handleChange} />
          {sections}
          <PostAddSection
            username={username}
            postId={postId}
            handleClick={this.handleAddSection} />

          <div className="Container narrow">
            <h4>Metadata</h4>
            <DayPicker
              onDayClick={day => this.handleChange({publishDate: day.toISOString() })}
              enableOutsideDays
              selectedDays={[new Date(post.publishDate)]} />
            <EditLocations
              locations={post.locations}
              onCreate={this.handleCreateLocation}
              onDelete={this.handleDeleteLocation} />
            {post.published &&
              <Button
                type="destructive"
                title="Unpublish post"
                onClick={_ => this.handleChange({published: false})} />
            }
            {!post.published &&
              <Button
                title="Publish post"
                onClick={_ => this.handleChange({published: true})} />
            }
          </div>
        </div>
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
