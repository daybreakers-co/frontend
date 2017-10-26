import React from 'react'
import PropTypes from 'prop-types'

import DateRangeInput from './DateRangeInput'
import PlainTextAreaInput from './PlainTextAreaInput'
import Dates from './Dates'

import './TripHeader.css'
import './EditTripHeader.css'

class EditTripHeader extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { startDate, endDate, title, subtitle } = this.props

    return (
      <div className="TripHeader edit">
        <hgroup>
          <PlainTextAreaInput
            className="H-Large"
            value={title || ""}
            placeholder="Enter the title of your trip"
            onBlur={({ text }) => this.props.onChange({ title: text })} />
          <Dates>
            <DateRangeInput
              startDate={startDate}
              endDate={endDate}
              onChange={(result) => this.props.onChange(result)}
            />
          </Dates>
          <PlainTextAreaInput
            className="T-Large"
            value={subtitle || ""}
            placeholder="Enter an introduction to your trip"
            onBlur={({text}) => this.props.onChange({subtitle: text})} />
        </hgroup>
      </div>
    )
  }
}

export default EditTripHeader;
