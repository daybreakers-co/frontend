import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import ScaledImage from '../../../ScaledImage'
import UploadableImage from '../../../UploadableImage'

import './Hero.css'
import '../../../Dropzone.css'

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

    if (file) {
      component = <UploadableImage
            parentType="HeroSection"
            parentId={id}
            file={this.state.file} />
    } else if (photo) {
      component = <ScaledImage
            key={photo.id}
            image={photo}
            style={{flex: photo.ratio}}
            alt="image"/>
    }
    return (
      <div className="Hero edit">
        <Dropzone onDrop={this.onDrop} className="Dropzone">
         {component}
        </Dropzone>
      </div>
    )
  }
}

export default EditHero;
