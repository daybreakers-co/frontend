import React from 'react'
import PropTypes from 'prop-types'
import Geosuggest from 'react-geosuggest';

import './EditLocations.css'

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
      <div className="locations">
        <label><i className="fa fa-map-marker" /></label>
        <Geosuggest
        className="small"
        placeholder="Find locations"
        onSuggestSelect={this.handleSuggestSelect} />
        {locations.map(location => (
          <div className="tag" key={location.id}>
            {location.title}
            <a onClick={(e) => onDelete(location)}>
              <i className="fa fa-times" />
            </a>
          </div>
        ))}
      </div>
    )
  }
}

export default EditLocations;
