import React from 'react'
import PropTypes from 'prop-types'

import './ScaledImage.css'

class ScaledImage extends React.Component {
  constructor(props) {
    super()

    this.state = {
      width: '360'
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
    if (this.previewImage) {
      this.previewImage.onload = function(){}
      delete this.previewImage
    }
  }

  // Once the preview has been loaded, load the full image
  handleLoadFullImage = ({ target }) => {
    if(this.state.width === target.offsetWidth) {
      return
    }
    this.setState({ width: target.offsetWidth })
  }

  render() {
    const { alt, style, image } = this.props

    return (
      <figure className="ScaledImage" style={style}>
        <img
          ref={(previewImage) => { this.previewImage = previewImage }}
          onLoad={this.handleLoadFullImage}
          alt={alt}
          src={`${image.url}?width=360`}
          srcSet={[
            `${image.url}?width=360 360w`,
            `${image.url}?width=720 720w`,
            `${image.url}?width=1200 1200w`,
            `${image.url}?width=2200 2200w`,
          ].join(",")}
          sizes={`${this.state.width}px`} />
      </figure>
    )
  }
}

export default ScaledImage
