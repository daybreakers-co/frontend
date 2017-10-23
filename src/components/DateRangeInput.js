import React from 'react';
import PropTypes from 'prop-types'

import moment from 'moment'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import './DayPicker.css';

class DateRangeInput extends React.Component {
  constructor(props) {
    super()
    this.state = {
      focusedInput: null
    }
  }

  handleDateRangeChange = ({ startDate, endDate }) => {
    var changes = {}
    if (startDate) {
      changes['startDate'] = startDate.format()
    }
    if (endDate) {
      changes['endDate'] = endDate.format()
    }
    this.props.onChange(changes)
  }

  render() {
    const { startDate, endDate } = this.props;

    return (
      <DateRangePicker
        minimumNights={0}
        isOutsideRange={() => false}
        startDate={moment(startDate)} // momentPropTypes.momentObj or null,
        endDate={moment(endDate)} // momentPropTypes.momentObj or null,
        onDatesChange={this.handleDateRangeChange} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      />
    );
  }
}

export default DateRangeInput;


