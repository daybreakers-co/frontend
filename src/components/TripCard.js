import React from 'react'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import moment from 'moment'

import { Link } from 'react-router-dom'
import './TripCard.css'

import TripCardFragment from '../graphql/_TripCard.gql'

const TripCard = ({ link, trip: { title, subtitle, photoCount, header, postCount, photos, startDate, endDate } }) => {

  let shuffled = shuffle(photos)
  let photoGroups = partition(shuffled, 3, 8)
  var duration = moment.duration(moment(endDate).diff(moment(startDate)));
  var days = parseInt(duration.asDays() + 1, 10);

  return(<div className="TripCard">

    <div className="Container">
      <header>
        <h1>
          <Link to={link}>
            {title || "Untitled"}
            <small>
              {`${days} ${pluralize("day", days)}`}
              &mdash;
              {`${postCount} ${pluralize("post", postCount)}`}
              &mdash;
              {`${photoCount} ${pluralize("photo", photoCount)}`}
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
              <figure key={photo.id}><img alt={photo.title} src={`${photo.url}?h=80`} /></figure>
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
  for (var ii = 0; (ii < input.length ); ii += 1) {
    if (max && ii === size * max) { break }
    results[ii % size].push(input[ii])
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

TripCard.propTypes = {
  link: PropTypes.string.isRequired,
  trip: propType(TripCardFragment).isRequired,
}

export default TripCard;
