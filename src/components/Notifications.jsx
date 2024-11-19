import React from 'react';
import BackButton from './BackButton';

// Mock notifications data
const mockNotifications = [
  { id: 1, message: 'Alice commented on "Weekend Trip"', timestamp: '10:00 AM' },
  { id: 2, message: 'Bob shared a new topic: "Team Lunch Ideas"', timestamp: '10:30 AM' },
  { id: 3, message: 'Charlie voted on "Project Deadline"', timestamp: '11:00 AM' },
  { id: 4, message: 'You were added to "Neighborhood Cleanup"', timestamp: '1:00 PM' },
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
    marginBottom: '20px',
  },
  notificationsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  notificationItem: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  message: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  },
  timestamp: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'right',
  },
};

const Notifications = () => {
  return (
    <div style={styles.container}>
      <BackButton />
      <h1 style={styles.header}>Notifications</h1>
      <ul style={styles.notificationsList}>
        {mockNotifications.map((notification) => (
          <li key={notification.id} style={styles.notificationItem}>
            <p style={styles.message}>{notification.message}</p>
            <p style={styles.timestamp}>{notification.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
