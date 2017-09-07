import React from 'react'
import PropTypes from 'prop-types'
import { withContentRect } from 'react-measure'

import './ScaledImage.css'

class ScaledImage extends React.Component {
  constructor(props) {
    super()
    let url = props.image ? `${props.image.url}?width=${40}` : undefined
    this.state = {
      fullImageLoading: false,
      fullImageLoaded: false,
      src: url
    }
  }

  static propTypes = {
    image: PropTypes.object,
    alt: PropTypes.string.isRequired
  }


  static defaultProps = {
    style: {}
  }

  loadFullImage = (src) => {
    this.setState({fullImageLoading: true})
    let img = new Image();
    img.onload = (event) => {
      this.setState({
        src: src,
        fullImageLoaded: true
      })
    }
    img.src = src;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contentRect.bounds && !this.state.fullImageLoading && nextProps.image) {
      const { width, height } = nextProps.contentRect.bounds;
      const roundedWidth = Math.round(width)
      const roundedHeight = Math.round(height)

      this.loadFullImage(`${nextProps.image.url}?width=${roundedWidth}&height=${roundedHeight}`)
    }
  }

  render() {
    const { alt, style } = this.props;

    return (
      <figure className="ScaledImage" ref={this.props.measureRef} style={style}>
        {!this.state.fullImageLoaded && <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>}
        <img
          src={this.state.src}
          alt={alt} />
      </figure>
    )
  }
}

export default withContentRect('bounds')(ScaledImage);
