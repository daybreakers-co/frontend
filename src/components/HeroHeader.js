import React from 'react'
import PropTypes from 'prop-types'

import ScaledImage from './ScaledImage'
import './HeroHeader.css'

const HeroHeader = ({ title, subtitle, image }) => (
  <section className="Container full header HeroHeader">
    <ScaledImage image={image} alt="Hero Header" />
    <hgroup>
      <h1>{title}</h1>
      {subtitle && <h4>{subtitle}</h4>}
    </hgroup>
  </section>
)

HeroHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.object
}

export default HeroHeader;
