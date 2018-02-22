import React from 'react'
import PropTypes from 'prop-types'

import './UploadableImage.css'

class UploadableImage extends React.Component {
  constructor(props) {
    super()

    this.state = {
      percentComplete: -1,
      error: null,
      src: null,
      photo: null,
      ratio: 1
    }
    this.setPreview(props)
  }

  static propTypes = {
    file: PropTypes.object.isRequired,
    onComplete: PropTypes.func
  }

  // Cleanup any loading images / uploads and
  // prevent setState from beeing called on removed component.
  componentWillUnmount = () => {
    if (this.img) {
      this.img.onload = function(){}
      delete this.img
    }

    if (this.xhr) {
      this.xhr.abort()
      delete this.xhr
    }
  }

  // If we receive new props, check if we need to abort the current upload,
  // because a new image has been dropped.
  componentWillReceiveProps = (nextProps) => {
    if (this.props.file === nextProps.file) {
      return
    }
    if (this.xhr) {
      this.xhr.abort()
      delete this.xhr
     }
    this.setPreview(nextProps)
  }

  setPreview = (props) => {
    var reader = new FileReader()
    reader.onload = (event) => {
      this.setState({src: reader.result, progress: 1})
      this.uploadFile(props)
    }
    reader.readAsDataURL(props.file)
  }

  handlePreviewImageLoad = (event) => {
    this.setState({ratio: (event.target.offsetWidth / event.target.offsetHeight) })
  }

  handleUploadProgress = (event) => {
    if (event.lengthComputable) {
      var percentComplete = Math.round((event.loaded / event.total) * 100)
      this.setState({percentComplete: percentComplete})
    }
  }

  handleUploadError = (error) => {
    this.setState({error: error})
  }

  handleUploadComplete = (event) => {
    let photo = JSON.parse(event.target.response)
    let width = this.previewImage.offsetWidth
    let height = this.previewImage.offsetHeight
    this.setState({photo: photo})
    this.loadFullImage(`${photo.url}?width=${width}&height=${height}`)
  }

  // Once the final image is loaded, set it's src, remove references
  // and call the onComplete callback, if set
  handleLoadFullImage = (event) => {
    this.setState({
      src: event.target.src,
      percentComplete: -1,
    })
    delete this.img
    delete this.xhr
    if (this.props.onComplete) {
      this.props.onComplete({
        photo: this.state.photo,
        preRenderedUrl: this.state.src
      })
    }
  }

  // Loads full image in the background, calls callback when complete
  loadFullImage = (src) => {
    let img = new Image()
    img.onload = this.handleLoadFullImage
    this.img = img
    img.src = src
  }

  getFormData = ({ parentType, parentId, file }) => {
    let data = new FormData()
    data.append('image', file)
    data.append('parentType', parentType)
    data.append('parentId', parentId)
    return data
  }

  uploadFile = (props) => {
    let data = this.getFormData(props)
    let url = `${process.env.REACT_APP_API_URL}/photos`

    var xhr = new XMLHttpRequest()
    xhr.open('POST',  url,  true)

    xhr.setRequestHeader(
      "authorization",
      `Bearer ${localStorage.getItem('authenticationToken')}`
    )

    xhr.upload.addEventListener("progress", this.handleUploadProgress, false)
    xhr.onerror = this.handleUploadError
    xhr.onload = this.handleUploadComplete

    this.xhr = xhr
    xhr.send(data)
  }

  render () {
    const { src, error, percentComplete } = this.state

    let className = "ScaledImage";

    if (this.props.cover) {
      className += " cover"
    }

    return (
      <div className="UploadableImage" style={{flex: this.state.ratio}}>
        <figure className={className}>
          {src &&
            <img
              onLoad={this.handlePreviewImageLoad}
              ref={(previewImage) => { this.previewImage = previewImage }}
              src={src}
              alt="preview" />
          }
        </figure>
        { error &&
          <div className="uploadError">
            <span>Upload error. Please try again!</span>
        </div>}
        { percentComplete > 0 && <div className="progress" style={{width: `${percentComplete}%`}}></div>}
      </div>
    )
  }
}

export default UploadableImage
