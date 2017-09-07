import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { uploadPhoto } from '../../../../utils/uploadPhoto'
import './Hero.css'
import ScaledImage from '../../../ScaledImage'

class EditHero extends React.Component {
  constructor(props) {
    super()

    this.state = {
      photo: props.photo
    }
  }

  static propTypes = {
    postId:   PropTypes.string.isRequired,
    index:    PropTypes.number.isRequired,
    photo:    PropTypes.object
  }

  onDrop = (files) => {
    let file = files[0]
    uploadPhoto(file, 'HeroSection', this.props.id).then(image => {
      this.setState({photo: image})
    })
  }

  render () {
    const { photo } = this.state;
    return (
      <div className="EditHero">
        <Dropzone onDrop={this.onDrop} className="dropzone">
          {photo &&  <ScaledImage
            key={photo.id}
            image={photo}
            style={{flex: photo.ratio}}
            alt="image"/>
          }
        </Dropzone>
      </div>
    )
  }
}

export default EditHero;
