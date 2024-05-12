import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Confirmation Modal"
      style={{
        
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '500px',
          height: '130px',
          margin: 'auto',
          border: '1px solid #ccc',
          background: '#ffff',
          borderRadius: '4px',
          padding: '20px',

        },
      }}
    >
      <h5>{message}</h5>
      <div style={{margin:"8px", display:"flex", justifyContent:"end"}}>
      <button style={{background:"red",color:"white",padding:"5px",margin:"5px"}} onClick={onConfirm}>Confirm</button>
      <button style={{background:"green",color:"white",padding:"5px",margin:"5px"}}  onClick={onCancel}>Cancel</button>
 
      </div>
    </Modal>
  );
};

export default ConfirmModal;
