import React from 'react'
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import ScaledImage from './ScaledImage'
import './HeaderCard.css'

import HeaderCardFragment from '../graphql/_HeaderCard.gql'

const HeaderCard = ({ link, type, headerCard: { title, subtitle, header } }) => (
  <div className={`HeaderCard ${type}`}>
    <Link to={link}>
      <ScaledImage image={header} alt="Trip header" cover />
      <hgroup>
        <h1>{title || "Untitled"}</h1>
        <h2>25 days &mdash; 234 photos</h2>
        {subtitle && <p>{subtitle.substr(0, 200)}...</p>}
        <span className="Button large secondary">View trip</span>
      </hgroup>
    </Link>
  </div>
)

HeaderCard.propTypes = {
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  headerCard: propType(HeaderCardFragment).isRequired,
}

export default HeaderCard;
