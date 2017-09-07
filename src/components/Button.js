import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

const Button = ({ onClick, title, size, type, disabled, children }) => {
  let classNames = ["Button", size, type];

  if(disabled) { classNames.push("disabled") }

  return (
    <a className={classNames.join(" ")} onClick={onClick}>
      {title || children}
    </a>
  )
}

Button.defaultProps = {
  size: "normal",
  type: "primary",
  disabled: false
}

Button.propTypes = {
  onClick:  PropTypes.func.isRequired,
  title:    PropTypes.string,
  size:     PropTypes.string,
  type:     PropTypes.string,
  disabled: PropTypes.bool
}

export default Button
