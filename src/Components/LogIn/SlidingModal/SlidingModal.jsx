import React from 'react';
import './SlidingModal.css';

const SlidingModal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`slide-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {children} {/* This will render the login form */}
      </div>
    </div>
  );
};

export default SlidingModal;
