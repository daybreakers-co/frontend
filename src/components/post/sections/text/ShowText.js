import React from 'react'
import { propType } from 'graphql-anywhere';

import ShowTextFragment from '../../../../graphql/_ShowText.gql'

const ShowText = ({textSection: { id, title, body, index}}) => (
  <div className="Text Container narrow">
    <h2 className="TextTitle">{title}</h2>
    <div className="TextContent">{body}</div>
  </div>
);

ShowText.propTypes = {
  textSection: propType(ShowTextFragment).isRequired,
}

export default ShowText;
