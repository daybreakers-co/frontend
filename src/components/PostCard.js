import React from 'react'
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import ScaledImage from './ScaledImage'
import DateRange from './DateRange'
import Dates from './Dates'

import './PostCard.css'

import PostCardFragment from '../graphql/_PostCard.gql'

const PostCard = ({ link, size, label, post: { title, subtitle, header, startDate, endDate } }) => (
  <div className={`PostCard ${size}`}>
    <Link to={link}>
      <ScaledImage image={header} alt="Trip header" cover />
      <hgroup>
        <Dates>
          <DateRange startDate={startDate} endDate={endDate} />
        </Dates>
        <h1 className="H-Medium">{title || "Untitled Post"}</h1>
        {subtitle && <p className="T-Medium">{subtitle}</p>}
        <span className="Button secondary">View {label && <span>{label} </span>}post</span>
      </hgroup>
    </Link>
  </div>
)

PostCard.propTypes = {
  link: PropTypes.string.isRequired,
  size: PropTypes.string,
  post: propType(PostCardFragment).isRequired,
  label: PropTypes.string
}

export default PostCard;
