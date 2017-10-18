import React from 'react'
import { propType } from 'graphql-anywhere';

import ScaledImage from '../../../ScaledImage'
import ShowHeroFragment from '../../../../graphql/_ShowHero.gql'

import './Hero.css'

const ShowHero = ({ heroSection: { id, index, photo }}) => (
  <div className="Hero Container full">
    <ScaledImage
      key={photo.id}
      image={photo}
      style={{flex: photo.ratio}}
      alt="image"/>
  </div>
)

ShowHero.propTypes = {
  heroSection: propType(ShowHeroFragment).isRequired,
}

export default ShowHero;
