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
      header: nextProps.header
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
    const { header, uploadParentId, uploadParentType, startDate, endDate } = this.props
    const { title, subtitle, file } = this.state
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
      <Dropzone onDrop={this.onDrop} className="HeroHeader edit" disableClick={true}>
        {backgroundImage}
        <hgroup>
          <input
            className="H-Large"
            value={title || ""}
            placeholder="Enter the title of your post"
            onChange={(e) => this.setState({title: e.target.value})}
            onBlur={this.handleBlur} />
          <dates>
            <DateRangePicker
              minimumNights={0}
              isOutsideRange={() => false}
              startDate={moment(startDate)} // momentPropTypes.momentObj or null,
              endDate={moment(endDate)} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => {
                var changes = {}
                if(startDate) {
                  changes['startDate'] = startDate.format()
                }
                if(endDate) {
                  changes['endDate'] = endDate.format()
                }
                this.props.onChange(changes)
              }} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
          </dates>
          <input
            className="T-Large"
            value={subtitle || ""}
            placeholder="Enter an introduction to your post"
            onChange={(e) => this.setState({subtitle: e.target.value})}
            onBlur={this.handleBlur} />
        </hgroup>
      </Dropzone>
    )
  }
}

export default EditHeroHeader;
