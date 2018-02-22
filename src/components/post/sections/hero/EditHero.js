import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import ScaledImage from '../../../ScaledImage'
import UploadableImage from '../../../UploadableImage'

import './Hero.css'

class EditHero extends React.Component {
  constructor(props) {
    super()

    this.state = {
      file: null,
    }
  }

  static propTypes = {
    id:    PropTypes.string.isRequired,
    photo: PropTypes.object
  }

  onDrop = (files) => {
    this.setState({file: files[0]})
  }

  render () {
    const { file } = this.state;
    const { photo, id } = this.props;
    let component = null
    let className = "Hero edit empty";

    if (file) {
      component = <UploadableImage
            parentType="HeroSection"
            parentId={id}
            file={this.state.file} />
      className = "Hero edit"
    } else if (photo) {
      component = <ScaledImage
            key={photo.id}
            image={photo}
            style={{flex: photo.ratio}}
            alt="image"/>
      className = "Hero edit"
    }
    return (
      <div className={className}>
        <Dropzone onDrop={this.onDrop} className="Dropzone">
         {component}
        </Dropzone>
      </div>
    )
  }
}

export default EditHero;
