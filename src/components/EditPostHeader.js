import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import UploadableImage from './UploadableImage'
import ScaledImage from './ScaledImage'

import DateRangeInput from './DateRangeInput';

import './PostHeader.css'
import './EditPostHeader.css'

class EditPostHeader extends React.Component {
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
      <Dropzone onDrop={this.onDrop} className="PostHeader edit" disableClick={true}>
        {backgroundImage}
        <hgroup>
          <input
            className="H-Large"
            value={title || ""}
            placeholder="Enter the title of your post"
            onChange={(e) => this.setState({title: e.target.value})}
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
            onChange={(e) => this.setState({subtitle: e.target.value})}
            onBlur={this.handleBlur} />
        </hgroup>
      </Dropzone>
    )
  }
}

export default EditPostHeader;
