import React from 'react'
import { propType } from 'graphql-anywhere';
import Remarkable from 'remarkable'

import ShowTextFragment from '../../../../graphql/_ShowText.gql'

const ShowText = ({textSection: { id, title, body, index}}) => {
  let md = new Remarkable()

  return( <div className="Text Container narrow">
    <h2 className="H-Medium">{title}</h2>
    <div className="T-Medium" dangerouslySetInnerHTML={{ __html: md.render(body)}} />
  </div>)
};

ShowText.propTypes = {
  textSection: propType(ShowTextFragment).isRequired,
}

export default ShowText;
