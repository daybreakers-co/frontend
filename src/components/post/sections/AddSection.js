import React from 'react'
import PropTypes from 'prop-types'
import './AddSection.css';

class PostAddSection extends React.Component {

  static propTypes = {
    handleClick: PropTypes.func.isRequired
  }

  render() {
    return(
      <div className="AddSection">
        <div>
          <a onClick={(e) => this.props.handleClick("TEXT")}>
            <i className="fa fa-font" aria-hidden="true" />
            Text
          </a>
        </div>
        <div>
          <a onClick={(e) => this.props.handleClick("PHOTOROW")}>
            <i className="fa fa-image" aria-hidden="true" />
            Photorow
          </a>
        </div>
        <div>
          <a onClick={(e) => this.props.handleClick("HERO")}>
            <i className="fa fa-image" aria-hidden="true" />
            Image
          </a>
        </div>
      </div>
    )
  }
}

export default PostAddSection;
