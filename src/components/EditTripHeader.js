import React from 'react'
import PropTypes from 'prop-types'

import DateRangeInput from './DateRangeInput';

import './TripHeader.css'
import './EditTripHeader.css'

class EditTripHeader extends React.Component {
  constructor(props) {
    super()
    this.state = {
      title: props.title,
      subtitle: props.subtitle
    }
  }

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      subtitle: nextProps.subtitle
    })
  }

  handleBlur = () => {
    this.props.onChange({
      title: this.state.title,
      subtitle: this.state.subtitle
    })
  }

  render() {
    const { startDate, endDate } = this.props
    const { title, subtitle } = this.state

    return (
      <div className="TripHeader edit">
        <hgroup>
          <input
            className="H-Large"
            value={title || ""}
            placeholder="Enter the title of your post"
            onChange={(e) => this.setState({ title: e.target.value })}
            onBlur={this.handleBlur} />
          <dates>
            <DateRangeInput
              startDate={startDate}
              endDate={endDate}
              onChange={(result) => this.props.onChange(result)}
            />
          </dates>
          <input
            className="T-Large"
            value={subtitle || ""}
            placeholder="Enter an introduction to your post"
            onChange={(e) => this.setState({ subtitle: e.target.value })}
            onBlur={this.handleBlur} />
        </hgroup>
      </div>
    )
  }
}

export default EditTripHeader;
