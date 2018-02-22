import React from 'react'
import PropTypes from 'prop-types'

import DateRange from './DateRange'
import Dates from './Dates'

import './TripHeader.css'

const TripHeader = ({ title, subtitle, startDate, endDate }) => (
  <section className="TripHeader">
    <hgroup>
      <Dates>
        <DateRange startDate={startDate} endDate={endDate}><i className="fa fa-angle-right"></i></DateRange>
      </Dates>
      <h1 className="H-Large trip-title">{title || "Untitled trip"}</h1>
      {subtitle && <p className="T-Large trip-intro">{subtitle}</p>}
    </hgroup>
  </section>
)

TripHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
}

export default TripHeader;
