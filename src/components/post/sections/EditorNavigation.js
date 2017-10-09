import React from 'react';
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { postDataByUsernameAndIdFromProxy } from '../../../pages/EditPostPage'

import DeleteSectionQuery from '../../../graphql/DeleteSectionQuery.gql'
import UpdateSectionQuery from '../../../graphql/UpdateSectionQuery.gql'
import PostPageQuery from '../../../graphql/PostPageQuery.gql'

import './EditorNavigation.css';
import './EditorSection.css';

export class EditorNavigation extends React.Component {
  static propTypes = {
    username:       PropTypes.string.isRequired,
    postId:         PropTypes.string.isRequired,
    id:             PropTypes.string.isRequired,
    index:          PropTypes.number.isRequired,
    sectionsLength: PropTypes.number.isRequired,
    sectionsIndex:  PropTypes.array.isRequired
  }

  handleRemove = (event) => {
    event.preventDefault();

    const { postId, id, username } = this.props;
    this.props.deleteMutation({
      variables: {id: id},
      optimisticResponse: {
        deleteSection: {
          id: id,
          '__typename': this.props.__typename
        }
      },
      update: (proxy, { data: { deleteSection } }) => {
        let data = postDataByUsernameAndIdFromProxy(username, postId, proxy);

        data.user.post.sections = data.user.post.sections.filter(text => text.id !== id)
        proxy.writeQuery({ query: PostPageQuery, data});
      },
    }).then((response) => {
      var sections = this.props.sectionsIndex.filter(sectionId => sectionId !== id);
      this.updateSectionIndexes(sections);
    })
  }

  handleMoveUp = (event) => {
    event.preventDefault();
    let oldIndex = this.props.index
    let newIndex = oldIndex -1;
    if (newIndex >= 0) {
      var sections = this.props.sectionsIndex;
      sections.splice(newIndex, 0, sections.splice(oldIndex, 1)[0]);
      this.updateSectionIndexes(sections);
    }
  }

  handleMoveDown = (event) => {
    event.preventDefault();
    let oldIndex = this.props.index
    let newIndex = oldIndex + 1;

    if (newIndex <= this.props.sectionsIndex.length) {
      var sections = this.props.sectionsIndex;
      sections.splice(newIndex, 0, sections.splice(oldIndex, 1)[0]);
      this.updateSectionIndexes(sections);
    }
  }

  updateSectionIndexes(array) {
    for (let index in array) {
      this.updateSectionIndex(parseInt(index, 10), array[index])
    }
  }

  updateSectionIndex(index, id) {
    const { postId, username } = this.props;
    this.props.updateMutation({
      variables: {id: id, index: index},
      optimisticResponse: {
        updateSection: {
          id: id,
          index: index,
          '__typename': this.props.__typename
        },
      },
      // After receiving mutated data from the server, update the cache
      update: (proxy, { data: { updateSection } }) => {
        let data = postDataByUsernameAndIdFromProxy(username, postId, proxy);

        for(let idx in data.user.post.sections) {
          if (data.user.post.sections[idx].id === updateSection.id) {
            data.user.post.sections[idx].index = updateSection.index
          }
        }
        // Replace the entire cache for the user,
        // what we got from the server is always the latest info
        proxy.writeQuery({ query: PostPageQuery, data});
      },
    })
  }

  render() {
    let moveDownButton;
    let moveUpButton;
    if (this.props.index > 0) {
      moveUpButton = <li><a onClick={this.handleMoveUp}><i className="fa fa-angle-up"></i></a></li>
    }

    if (this.props.index < (this.props.sectionsLength - 1)) {
      moveDownButton = <li><a onClick={this.handleMoveDown}><i className="fa fa-angle-down"></i></a></li>
    }

    return (
      <div className="EditorWithNavigation">
        <ul className="EditorNavigation">
          <li>
            <a href="remove this item" onClick={this.handleRemove}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </a>
          </li>
          {moveUpButton}
          {moveDownButton}
        </ul>
        <div className="EditorSection">
          {this.props.children}
        </div>
      </div>
    )
  }
};

export default graphql(DeleteSectionQuery, {name: "deleteMutation"})(graphql(UpdateSectionQuery, {name: "updateMutation"})(EditorNavigation));
