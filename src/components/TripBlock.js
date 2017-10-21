import React from 'react'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'

import { Link } from 'react-router-dom'
import ScaledImage from './ScaledImage'
import './TripBlock.css'

import TripBlockFragment from '../graphql/_TripBlock.gql'

const TripBlock = ({ link, trip: { title, subtitle, header, posts, photos } }) => {

  let shuffled = shuffle(photos)
  let photoGroups = partition(shuffled, 3, 8)
  return(<div className="TripBlock">
    <div className="Container">
      <header>
        <h1>
          <Link to={link}>
            {title || "Untitled"}
            <small>
              25 days
              &mdash;
              {`${posts.length} ${pluralize("post", posts.length)}`}
              &mdash;
              {`${photos.length} ${pluralize("photo", photos.length)}`}
            </small>
          </Link>
        </h1>
        {subtitle && <p>{subtitle}</p>}
        <Link to={link} className="Button large secondary">View trip</Link>
      </header>
      <div className="images">
        {photoGroups.map(group => (
          <div key={group.map(p => p.id).join()}>
            {group.map(photo => (
              <figure key={photo.id}><img src={`${photo.url}?width=360`} /></figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>)
}

function partition(input, size, max) {
  var results = [];
  for (var i = 0; i < size; i += 1) {
    results[i] = []
  }
  for (var i = 0; (i < input.length ); i += 1) {
    if (max && i == size * max) { break }
    results[i % size].push(input[i])
  }
  return results;
}

function shuffle(input) {
  var output = input.slice(0)
  for (var i = output.length - 1; i >= 0; i--) {

    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = output[randomIndex];

    output[randomIndex] = output[i];
    output[i] = itemAtIndex;
  }
  return output;
}

TripBlock.propTypes = {
  link: PropTypes.string.isRequired,
  trip: propType(TripBlockFragment).isRequired,
}

export default TripBlock;
