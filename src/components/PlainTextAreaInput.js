import React from 'react'
import TextAreaInput from "./TextAreaInput"
import { draftToPlainText, plainTextToDraft } from "../utils/PlainTextDraftjs";

const PlainTextAreaInput = (props) => {
  const handleBlur = ({ raw }) => {
    if (props.onBlur){
      props.onBlur({ text: draftToPlainText(raw) })
    }
  }

  return (
    <div className={props.className || "PlainTextAreaInput" }>
      <TextAreaInput {...props} onBlur={handleBlur} value={plainTextToDraft(props.value)} />
    </div>
  )
}

export default PlainTextAreaInput;
