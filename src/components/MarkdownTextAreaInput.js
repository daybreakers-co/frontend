import React from 'react'
import TextAreaInput from "./TextAreaInput"
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

const MarkdownTextAreaInput = (props) => {
  const handleBlur = ({ raw }) => {
    if (props.onBlur) {
      props.onBlur({ markdown: draftToMarkdown(raw) })
    }
  }

  var className = `MarkdownTextAreaInput ${props.className || ""}`
  return (
    <div className={className}>
      <TextAreaInput {...props} onBlur={handleBlur} value={markdownToDraft(props.value)} />
    </div>
  )
}

export default MarkdownTextAreaInput;
