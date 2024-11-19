import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    button: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: '#ddd',
      color: '#333',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      cursor: 'pointer',
      marginBottom: '16px',
    },
  };

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
        type="button"
      onClick={() => navigate(-1)}
      style={styles.button}
    >
      ← Back
    </button>
  );
};

export default BackButton;
