import React from 'react'
import PropTypes from 'prop-types'
import { Editor, Plain } from 'slate'
import { graphql } from 'react-apollo'
import { postDataByUsernameAndIdFromProxy } from '../../../../pages/EditPostPage'

import PostPageQuery from '../../../../graphql/PostPageQuery.gql'
import UpdateTextQuery from '../../../../graphql/UpdateTextQuery.gql'

import './EditText.css';

const schema = {
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    underlined: props => <u>{props.children}</u>,
  }
}

class PostEditText extends React.Component {
  constructor(props) {
    super()

    this.state = {
      title: props.title || '',
      state: Plain.deserialize(props.body || '')
    }
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
    postId:   PropTypes.string.isRequired,
    index:    PropTypes.number.isRequired,
    title:    PropTypes.string,
    body:     PropTypes.string
  }

  handleBlur = () => {
    const { username, postId } = this.props;
    let title = this.state.title;
    let body = Plain.serialize(this.state.state)

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
      <div className="EditText">
        <input
          className='w-100 pa3 mv2'
          value={this.state.title}
          placeholder='(Optional title)'
          onChange={(e) => this.setState({title: e.target.value})}
          onBlur={this.handleBlur}/>

        <Editor
          className="EditTextor"
          schema={schema}
          state={this.state.state}
          onChange={(state) => {this.setState({ state })}}
          placeholder="Write your text here..."
          onBlur={this.handleBlur} />
      </div>
    )
  }
}


export default graphql(UpdateTextQuery)(PostEditText);
