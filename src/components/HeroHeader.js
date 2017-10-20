import React from 'react'
import PropTypes from 'prop-types'

import ScaledImage from './ScaledImage'
import './HeroHeader.css'

const HeroHeader = ({ title, subtitle, image, type, startDate, endDate, locations }) => (
  <section className={`HeroHeader ${type}`}>
    <ScaledImage image={image} alt="Hero Header" cover />
    <hgroup>
      <date>{startDate} till {endDate}</date>
      <h1 className="title">{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </hgroup>
  </section>
)

HeroHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.object,
  type: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default HeroHeader;
