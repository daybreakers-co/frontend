import React from 'react'
import PropTypes from 'prop-types'

import ScaledImage from './ScaledImage'
import './HeroHeader.css'

const HeroHeader = ({ title, subtitle, image, type }) => (
  <section className={`HeroHeader ${type}`}>
    <ScaledImage image={image} alt="Hero Header" />
    <hgroup>
      <h1 className="title">{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </hgroup>
  </section>
)

HeroHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.object,
  type: PropTypes.string
}

export default HeroHeader;
