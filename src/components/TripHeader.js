import React from 'react'
import PropTypes from 'prop-types'

import ScaledImage from './ScaledImage'
import './TripHeader.css'

const TripHeader = ({ title, subtitle, startDate, endDate }) => (
  <section className="TripHeader">
    <hgroup>
      <h1 className="H-Large">{title}</h1>
      <date>
        {startDate}
        { endDate && <span> <i className="fa fa-angle-right"></i> {endDate}</span>
        }
      </date>
      {subtitle && <p className="T-Large">{subtitle}</p>}
    </hgroup>
  </section>
)

TripHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default TripHeader;
