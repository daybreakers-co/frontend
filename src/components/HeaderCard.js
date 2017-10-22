import React from 'react'
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import ScaledImage from './ScaledImage'
import './HeaderCard.css'

import HeaderCardFragment from '../graphql/_HeaderCard.gql'

const HeaderCard = ({ link, size, label, headerCard: { title, subtitle, header } }) => (
  <div className={`HeaderCard ${size}`}>
    <Link to={link}>
      <ScaledImage image={header} alt="Trip header" cover />
      <hgroup>
        <h1 className="H-Medium">{title || "Untitled Post"}</h1>
        <h2 className="H-Small">25 days &mdash; 234 photos</h2>
        {subtitle && <p className="T-Medium">{subtitle}</p>}
        <span className="Button secondary">View {label && <span>{label} </span>}post</span>
      </hgroup>
    </Link>
  </div>
)

HeaderCard.propTypes = {
  link: PropTypes.string.isRequired,
  size: PropTypes.string,
  headerCard: propType(HeaderCardFragment).isRequired,
  label: PropTypes.string
}

export default HeaderCard;
