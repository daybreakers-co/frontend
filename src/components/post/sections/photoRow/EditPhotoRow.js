import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { uploadPhoto } from '../../../../utils/uploadPhoto'
import './PhotoRow.css'
import ScaledImage from '../../../ScaledImage'

class PostEditPhotoRow extends React.Component {
  constructor(props) {
    super()

    this.state = {
      photos: (props.photos || []).map(e => e)
    }
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
    postId:   PropTypes.string.isRequired,
    index:    PropTypes.number.isRequired,
    photos:   PropTypes.array
  }

  onDrop = (files) => {
    for (let file of files) {
      uploadPhoto(file, 'PhotoRowSection', this.props.id).then(image => {
        let photos = this.state.photos
        photos.push({
          id:    image.id,
          url:   image.url,
          ratio: image.ratio
        })
        this.setState({photos: photos})
      })
    }
  }

  render () {
    let photos = this.state.photos.map((photo) => {
      return (
        <ScaledImage
        key={photo.id}
        image={photo}
        style={{flex: photo.ratio}}
        alt="image"/>
      )
    });
    return (
      <div className="EditPhotoRow">
        <Dropzone onDrop={this.onDrop} className="dropzone">
          <div className="columns">{photos}</div>
        </Dropzone>
      </div>
    )
  }
}


export default PostEditPhotoRow;
