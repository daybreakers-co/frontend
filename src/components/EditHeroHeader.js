import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import UploadableImage from './UploadableImage'
import ScaledImage from './ScaledImage'

import './HeroHeader.css'
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
    type: PropTypes.string,
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
    const { header, uploadParentId, uploadParentType, type } = this.props
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
      <Dropzone onDrop={this.onDrop} className={`HeroHeader edit ${type}`} disableClick={true}>
        {backgroundImage}
        <hgroup>
          <input
            className="title"
            value={title || ""}
            placeholder='(Amazing title)'
            onChange={(e) => this.setState({title: e.target.value})}
            onBlur={this.handleBlur} />
          <input
            className="subtitle"
            value={subtitle || ""}
            placeholder='(Optional subtitle)'
            onChange={(e) => this.setState({subtitle: e.target.value})}
            onBlur={this.handleBlur} />

          <p className="drophint"><i className="fa fa-picture-o" /> Drop an image here to update the header image.</p>
        </hgroup>
      </Dropzone>
    )
  }
}

export default EditHeroHeader;
