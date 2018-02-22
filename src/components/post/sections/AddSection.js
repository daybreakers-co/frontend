import React from 'react'
import PropTypes from 'prop-types'
import './AddSection.css';

class PostAddSection extends React.Component {

  static propTypes = {
    handleClick: PropTypes.func.isRequired
  }

  render() {
    return(
      <div className="AddSection" id="bottom">
        <div className="inner">
          <div>
            <a href="#bottom" onClick={(e) => this.props.handleClick("TEXT")}>
              <i className="fa fa-font" aria-hidden="true" />
              Title / text
            </a>
          </div>
          <div>
            <a href="#bottom" onClick={(e) => this.props.handleClick("PHOTOROW")}>
              <i className="fa fa-image" aria-hidden="true" />
              Row of photos
            </a>
          </div>
          <div>
            <a href="#bottom" onClick={(e) => this.props.handleClick("HERO")}>
              <i className="fa fa-image" aria-hidden="true" />
              Full width photo
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default PostAddSection;
