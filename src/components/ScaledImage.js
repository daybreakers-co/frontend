import React from 'react'
import PropTypes from 'prop-types'

import './ScaledImage.css'

class ScaledImage extends React.Component {
  constructor(props) {
    super()

    this.state = {
      loaded: false,
      src: props.image ? `${props.image.url}?width=${40}` : null
    }
  }

  static propTypes = {
    image: PropTypes.object,
    alt: PropTypes.string.isRequired
  }

  static defaultProps = {
    style: {}
  }

  // Cleanup any loading images and
  // prevent setState from beeing called on removed component.
  componentWillUnmount = () => {
    if (this.fullImage) {
      this.fullImage.onload = function(){}
      delete this.fullImage
    }

    if (this.previewImage) {
      this.previewImage.onload = function(){}
      delete this.previewImage
    }
  }

  // Once the full image has been loaded, set the image src and state
  handleFullImageLoaded = (event) => {
    this.setState({
      src: event.target.src,
      loaded: true
    })
  }

  // Once the preview has been loaded, load the full image
  handleLoadFullImage = ({target}) => {
    let fullImage = new Image()
    fullImage.onload = this.handleFullImageLoaded
    this.fullImage = fullImage
    fullImage.src = `${this.props.image.url}?width=${target.offsetWidth}&height=${target.offsetHeight}`
  }

  render() {
    const { alt, style } = this.props

    return (
      <figure className="ScaledImage" ref={this.props.measureRef} style={style}>
        {!this.state.loaded &&
          <i className="fa fa-circle-o-notch"></i>
        }
        <img
          ref={(previewImage) => { this.previewImage = previewImage }}
          onLoad={this.handleLoadFullImage}
          src={this.state.src}
          alt={alt} />
      </figure>
    )
  }
}

export default ScaledImage
