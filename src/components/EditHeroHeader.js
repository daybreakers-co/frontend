import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import './EditHeroHeader.css'

class EditHeroHeader extends React.Component {
  constructor(props) {
    super()
    this.state = {
      title: props.title,
      subtitle: props.subtitle
    }
  }

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    header: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onDrop:  PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      subtitle: nextProps.subtitle,
      header: nextProps.header
    })
  }

  handleBlur = () => {
    this.props.onChange({
      title:    this.state.title,
      subtitle: this.state.subtitle
    })
  }

  render () {
    let style = {};
    if (this.props.header) {
      style['backgroundImage'] = `url(${this.props.header.url}?width=1000)`
    }
    return (
      <div className="EditHeroHeader" style={style}>
        <Dropzone onDrop={this.props.onDrop} className="EditHeroHeaderOverlay" disableClick={true}>
          <input
            className="title"
            value={this.state.title}
            placeholder='(Title of your amazing journey)'
            onChange={(e) => this.setState({title: e.target.value})}
            onBlur={this.handleBlur} />
          <input
            className="subtitle"
            value={this.state.subtitle}
            placeholder='(Subtitle of your amazing journey)'
            onChange={(e) => this.setState({subtitle: e.target.value})}
            onBlur={this.handleBlur} />

          <p>Drop an image here to update the header image.</p>
        </Dropzone>
      </div>
    )
  }
}

export default EditHeroHeader;
