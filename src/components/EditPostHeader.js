import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import UploadableImage from './UploadableImage'
import ScaledImage from './ScaledImage'

import DateRangeInput from './DateRangeInput'
import PlainTextAreaInput from './PlainTextAreaInput'

import './PostHeader.css'
import './EditPostHeader.css'

class EditPostHeader extends React.Component {
  constructor(props) {
    super()
    this.state = {
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
      header: nextProps.header
    })
  }

  onDrop = (files) => {
    this.setState({file: files[0]})
  }


  render () {
    const { header, uploadParentId, uploadParentType, startDate, endDate, title, subtitle } = this.props
    const { file } = this.state
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
          <PlainTextAreaInput
            className="H-Large"
            value={title || ""}
            placeholder="Enter the title of your post"
            onBlur={({ text }) => this.props.onChange({ title: text })} />
          <dates>
            <DateRangeInput
              startDate={startDate}
              endDate={endDate}
              onChange={(result) => this.props.onChange(result)}
              />
          </dates>
          <PlainTextAreaInput
            className="T-Large"
            value={subtitle || ""}
            placeholder="Enter an introduction to your trip"
            onBlur={({ text }) => this.props.onChange({ subtitle: text })} />
        </hgroup>
      </Dropzone>
    )
  }
}

export default EditPostHeader;
