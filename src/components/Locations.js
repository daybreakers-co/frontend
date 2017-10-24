import React from 'react'
import PropTypes from 'prop-types'

import './Locations.css'

const Locations = ({ locations }) => (
  <section className="Locations">
    <ul className="tags">
      {locations.map(location => (
        <li className="tag" title={location.title}>{location.title.substr(0, 20)}...</li>
      ))}
    </ul>
  </section>
)

Locations.propTypes = {
  locations: PropTypes.array
}

export default Locations;
