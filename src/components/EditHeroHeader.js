import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import UploadableImage from './UploadableImage'
import ScaledImage from './ScaledImage'
import moment from 'moment'

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


import './HeroHeader.css'
import './EditHeroHeader.css'
import './DayPicker.css';

class EditHeroHeader extends React.Component {
  constructor(props) {
    super()
    this.state = {
      title: props.title,
      subtitle: props.subtitle,
      file: null
    }
  }

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    header: PropTypes.object,
    type: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    uploadParentId: PropTypes.string.isRequired,
    uploadParentType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      subtitle: nextProps.subtitle,
      header: nextProps.header,
      startDate: PropTypes.string,
      endDate: PropTypes.string
    })
  }

  onDrop = (files) => {
    this.setState({file: files[0]})
  }

  handleBlur = () => {
    this.props.onChange({
      title:    this.state.title,
      subtitle: this.state.subtitle
    })
  }

  render () {
    const { header, uploadParentId, uploadParentType, type } = this.props
    const { title, subtitle, file, startDate, endDate } = this.state
    let backgroundImage;

    if (file) {
      backgroundImage = <UploadableImage
      parentType={uploadParentType}
      parentId={uploadParentId}
      file={this.state.file}
      cover />
    } else if (header) {
      backgroundImage = <ScaledImage
      key={header.id}
      image={header}
      style={{flex: header.ratio}}
      cover
      alt="image"/>
    }
    return (
      <Dropzone onDrop={this.onDrop} className={`HeroHeader edit ${type}`} disableClick={true}>
        {backgroundImage}
        <hgroup>
          <input
            className="title"
            value={title || ""}
            placeholder='(Amazing title)'
            onChange={(e) => this.setState({title: e.target.value})}
            onBlur={this.handleBlur} />
          <dates>
            <DateRangePicker
              minimumNights={0}
              isOutsideRange={() => false}
              startDate={moment(startDate)} // momentPropTypes.momentObj or null,
              endDate={moment(endDate)} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => this.handleChange({ startDate: startDate.format(), endDate: endDate.format() })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
          </dates>
          <input
            className="subtitle"
            value={subtitle || ""}
            placeholder='(Optional subtitle)'
            onChange={(e) => this.setState({subtitle: e.target.value})}
            onBlur={this.handleBlur} />
        </hgroup>
      </Dropzone>
    )
  }
}

export default EditHeroHeader;
