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
      <div className="EditLocation">
        <Geosuggest
        onSuggestSelect={this.handleSuggestSelect} />
        <ul>
          {locations.map(location => (
            <li key={location.id}><a onClick={(e) => onDelete(location)}>{location.title}</a></li>
          ))}
        </ul>
      </div>
    )
  }
}

export default EditLocations;
