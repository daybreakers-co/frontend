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
    style: {},
    cover: false
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
  handleLoadFullImage = () => {
    let width = this.previewImage.offsetWidth;

    if (this.state.width === width) {
      return
    }
    this.setState({ width: width })
  }

  render() {
    const { alt, style, image, cover } = this.props
    let className = "ScaledImage";

    if (cover) {
      className += " cover"
    }

    return (
      <figure className={className} style={style}>
      { image &&
        <img
          ref={(previewImage) => { this.previewImage = previewImage }}
          onLoad={this.handleLoadFullImage}
          alt={alt}
          src={`${image.url}?w=360`}
          srcSet={[
            `${image.url}?w=360 360w`,
            `${image.url}?w=720 720w`,
            `${image.url}?w=1200 1200w`,
            `${image.url}?w=2200 2200w`,
          ].join(",")}
          sizes={`${this.state.width}px`} />
      }
      </figure>
    )
  }
}

export default ScaledImage
