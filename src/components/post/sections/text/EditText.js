import React from 'react'
import PropTypes from 'prop-types'
import MarkdownTextAreaInput from '../../../MarkdownTextAreaInput'
import { graphql } from 'react-apollo'
import { postDataByUsernameAndIdFromProxy } from '../../../../pages/EditPostPage'

import PostPageQuery from '../../../../graphql/PostPageQuery.gql'
import UpdateTextQuery from '../../../../graphql/UpdateTextQuery.gql'

import './Text.css'
import '../../../../../node_modules/draft-js/dist/Draft.css'

class PostEditText extends React.Component {
  constructor(props) {
    super()

    this.state = {
      title: props.title || ''
    }
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
    postId:   PropTypes.string.isRequired,
    index:    PropTypes.number.isRequired,
    title:    PropTypes.string,
    body:     PropTypes.string
  }

  handleBlur = ({ markdown }) => {
    const { username, postId } = this.props;
    let title = this.state.title;
    let body = markdown || this.props.body;
    this.props.mutate({
      variables: {id: this.props.id, title: title, body: body},
      optimisticResponse: {
        updateTextSection: {
          id: this.props.id,
          title: title,
          body: body,
          index: this.props.index,
          '__typename': 'TextSection'
        }
      },
      // After receiving mutated data from the server, update the cache
      update: (proxy, { data: { updateTextSection } }) => {
        let data = postDataByUsernameAndIdFromProxy(username, postId, proxy);

        for(let idx in data.user.post.sections) {
          if (data.user.post.sections[idx].id === updateTextSection.id) {
            data.user.post.sections[idx] = updateTextSection
          }
        }

        // Replace the entire cache for the viewer,
        // what we got from the server is always the latest info
        proxy.writeQuery({ query: PostPageQuery, data});
      },

    })
  }

  render () {
    return (
      <div className="Text Container narrow">
        <input
          className='H-Medium InputWithoutStyling'
          value={this.state.title}
          placeholder='Title of text section'
          onChange={(e) => this.setState({title: e.target.value})}
          onBlur={this.handleBlur}/>

        <MarkdownTextAreaInput
          className="T-Normal"
          value={this.props.body}
          placeholder="Your adventures go here."
          onBlur={this.handleBlur} />
      </div>
    )
  }
}

export default graphql(UpdateTextQuery)(PostEditText);
