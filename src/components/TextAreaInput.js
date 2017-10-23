import React from 'react'
import PropTypes from 'prop-types'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'

import '../../node_modules/draft-js/dist/Draft.css'

class TextAreaInput extends React.Component {
  constructor(props) {
    super()

    this.state = {
      editorState: props.value ? EditorState.createWithContent(convertFromRaw(props.value)) : EditorState.createEmpty()
    }
  }

  static defaultProps = {
    className: ""
  }

  static propTypes = {
    value: PropTypes.object,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string
  }

  handleBlur = () => {
    this.props.onBlur({ raw: convertToRaw(this.state.editorState.getCurrentContent()) })
  }

  render() {
    const { placeholder } = this.props
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={(editorState) => { this.setState({ editorState }) }}
        placeholder={placeholder}
        onBlur={this.handleBlur} />
    )
  }
}

export default TextAreaInput
