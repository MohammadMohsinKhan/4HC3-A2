import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

// Mock user data
const mockUsers = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'Diana Prince' },
  { id: 5, name: 'Eve Adams' },
];

const styles = {
  container: {
    padding: '16px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '16px',
  },
  userList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  userItem: {
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    color: '#555',
  },
  checkbox: {
    marginRight: '12px',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  shareButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

const ShareScreen = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleShare = () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user to share the topic with.');
      return;
    }

    alert(
      `Topic ${topicId} shared with: ${mockUsers
        .filter((user) => selectedUsers.includes(user.id))
        .map((user) => user.name)
        .join(', ')}`
    );
    navigate(-1); // Go back to the discussion page
  };

  return (
    <div style={styles.container}>
      <BackButton />
      <h1 style={styles.header}>Share Topic</h1>
      <ul style={styles.userList}>
        {mockUsers.map((user) => (
          <li key={user.id} style={styles.userItem}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => toggleUserSelection(user.id)}
              style={styles.checkbox}
            />
            {user.name}
          </li>
        ))}
      </ul>
      <div style={styles.actions}>
        <button onClick={() => navigate(-1)} style={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={handleShare} style={styles.shareButton}>
          Share
        </button>
      </div>
    </div>
  );
};

export default ShareScreen;
