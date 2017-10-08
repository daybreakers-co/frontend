import React from 'react'

const Modal = ({ onClose, children }) => {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999
      }}
    >
      <div className='Centered'>
        <div className="Container narrow padded" style={{backgroundColor: 'white'}}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;
