import React from 'react'
import "./Modal.css"

const Modal = ({ onClose, children }) => {
  return (
    <div className="Modal" onClick={onClose} >
      <div className="Container narrow padded" style={{backgroundColor: 'white'}}>
        {children}
      </div>
    </div>
  )
}

export default Modal;
