import React from 'react'
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import ScaledImage from './ScaledImage'
import './HeaderCard.css'

import HeaderCardFragment from '../graphql/_HeaderCard.gql'

const HeaderCard = ({ link, headerCard: { title, subtitle, header } }) => (
  <div className="HeaderCard">
    <Link to={link}>
      <ScaledImage image={header} alt="Trip header" auto={false} />
      <hgroup>
        <h1>{title || "Untitled"}</h1>
        {subtitle && <h4>{subtitle}</h4>}
      </hgroup>
    </Link>
  </div>
)

HeaderCard.propTypes = {
  link: PropTypes.string.isRequired,
  headerCard: propType(HeaderCardFragment).isRequired,
}

export default HeaderCard;