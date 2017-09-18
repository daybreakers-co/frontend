import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import UploadableImage from './UploadableImage'
import ScaledImage from './ScaledImage'

import './EditHeroHeader.css'

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
    const { header, uploadParentId, uploadParentType } = this.props
    const { title, subtitle, file } = this.state
    let backgroundImage;

    if (file) {
      backgroundImage = <UploadableImage
      parentType={uploadParentType}
      parentId={uploadParentId}
      file={this.state.file} />
    } else if (header) {
      backgroundImage = <ScaledImage
      key={header.id}
      image={header}
      style={{flex: header.ratio}}
      alt="image"/>
    }
    return (
      <Dropzone onDrop={this.onDrop} className="EditHeroHeader" disableClick={true}>
        {backgroundImage}
        <hgroup>
          <input
            className="title"
            value={title || ""}
            placeholder='(Title of your amazing journey)'
            onChange={(e) => this.setState({title: e.target.value})}
            onBlur={this.handleBlur} />
          <input
            className="subtitle"
            value={subtitle || ""}
            placeholder='(Optional subtitle)'
            onChange={(e) => this.setState({subtitle: e.target.value})}
            onBlur={this.handleBlur} />

          <p>Drop an image here to update the header image.</p>
        </hgroup>
      </Dropzone>
    )
  }
}

export default EditHeroHeader;
