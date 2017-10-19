import React from 'react'
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import ScaledImage from './ScaledImage'
import './TripBlock.css'

import TripBlockFragment from '../graphql/_TripBlock.gql'

const TripBlock = ({ link, trip: { title, subtitle, header } }) => (
  <div className="TripBlock">
    <div className="Container">
      <header>
        <h1>
          <Link to={link}>
            {title || "Untitled"}
            <small>25 days &mdash; 3 posts &mdash; 234 photos</small>
          </Link>
        </h1>
        {subtitle && <p>{subtitle}</p>}
        <Link to={link} className="Button large secondary">View trip</Link>
      </header>
      <div className="images">
        <div>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
        </div>
        <div>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
        </div>
        <div>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
          <figure><img src={`${header.url}?width=360`} /></figure>
        </div>
      </div>
    </div>
  </div>
)

TripBlock.propTypes = {
  link: PropTypes.string.isRequired,
  trip: propType(TripBlockFragment).isRequired,
}

export default TripBlock;
