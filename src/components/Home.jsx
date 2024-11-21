import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    padding: '16px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '20px',
    color: '#333',
  },
  notificationsIcon: {
    fontSize: '20px',
    cursor: 'pointer',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  topicList: {
    listStyle: 'none',
    padding: 0,
  },
  topicItem: {
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  viewButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

const Home = () => {
  const navigate = useNavigate();
  const topics = [
    { id: 1, title: 'Weekend Trip', status: 'Ongoing' },
    { id: 2, title: 'Project Deadline', status: 'Finalized' },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Group Decision-Making</h1>
        <button
          onClick={() => navigate('/notifications')}
          style={styles.notificationsIcon}
        >
          🔔
        </button>
      </header>
      <button
        onClick={() => navigate('/create-topic')}
        style={styles.createButton}
      >
        + Create New Topic
      </button>
      <ul style={styles.topicList}>
        {topics.map((topic) => (
          <li key={topic.id} style={styles.topicItem}>
            <h3>{topic.title}</h3>
            <p>Status: {topic.status}</p>
            <button
              onClick={() => navigate(`/discussion/${topic.id}`)}
              style={styles.viewButton}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
