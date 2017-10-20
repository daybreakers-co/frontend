import React from 'react'
import PropTypes from 'prop-types'
import Geosuggest from 'react-geosuggest';

import './geosuggest.css'
import './Locations.css'

class EditLocations extends React.Component {
  static propTypes = {
    locations: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  handleSuggestSelect = (suggestion) => {
    this.props.onCreate({
      title: suggestion.label,
      lat: suggestion.location.lat,
      lng: suggestion.location.lng
    })
  }

  render () {
    const { locations, onDelete } = this.props;
    return (
      <section className="Locations edit">
        <Geosuggest
        className="small"
        placeholder="Add locations 🔎"
        onSuggestSelect={this.handleSuggestSelect} />
        <ul className="tags">
          {locations.map(location => (
            <li className="tag" key={location.id}>
              {location.title}
              <a className="delete" title="Remove location" onClick={(e) => onDelete(location)}>
                <i className="fa fa-times" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

export default EditLocations;
