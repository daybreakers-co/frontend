import React from 'react'
import PropTypes from 'prop-types'

import DateRange from './DateRange'
import Dates from './Dates'
import ScaledImage from './ScaledImage'
import './PostHeader.css'

const PostHeader = ({ title, subtitle, image, type, startDate, endDate, locations }) => (
  <section className={`PostHeader ${type}`}>
    <ScaledImage image={image} alt="Hero Header" cover />
    <hgroup>
      <Dates>
        <DateRange startDate={startDate} endDate={endDate}><i className="fa fa-angle-right"></i></DateRange>
      </Dates>
      <h1 className="H-Large post-title">{title || "Untitled post"}</h1>
      {subtitle && <p className="T-Large post-intro">{subtitle}</p>}
    </hgroup>
  </section>
)

PostHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.object,
  type: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default PostHeader;
