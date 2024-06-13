import React from 'react';
import styles from './deleteMsg.module.css';

const DeleteMsg = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this kural?</p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.button}>Cancel</button>
          <button onClick={onConfirm} className={styles.button}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMsg;
