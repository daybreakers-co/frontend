import React from 'react'
import { propType } from 'graphql-anywhere';

import ShowTextFragment from '../../../../graphql/_ShowText.gql'

const ShowText = ({textSection: { id, title, body, index}}) => (
  <div className="Container narrow ShowText">
    <h2>{title}</h2>
    <div>{body}</div>
  </div>
);

ShowText.propTypes = {
  textSection: propType(ShowTextFragment).isRequired,
}

export default ShowText;
