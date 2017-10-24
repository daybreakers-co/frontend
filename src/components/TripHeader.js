import React from 'react'
import PropTypes from 'prop-types'

import DateRange from './DateRange'

import './TripHeader.css'

const TripHeader = ({ title, subtitle, startDate, endDate }) => (
  <section className="TripHeader">
    <hgroup>
      <h1 className="H-Large">{title}</h1>
      <date>
        <DateRange startDate={startDate} endDate={endDate}><i className="fa fa-angle-right"></i></DateRange>
      </date>
      {subtitle && <p className="T-Large">{subtitle}</p>}
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
