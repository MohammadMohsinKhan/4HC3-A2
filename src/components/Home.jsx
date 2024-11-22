import React, { useEffect, useState } from 'react';
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
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    transition: 'background-color 0.3s, transform 0.3s',
    ':hover': {
      backgroundColor: '#e0e0e0',
      transform: 'scale(1.1)',
    },
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '150px', // Add a fixed height if necessary for consistent alignment
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
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  const getTopicsFromLocalStorage = () => {
    const storedTopics = localStorage.getItem('topics');
    return storedTopics ? JSON.parse(storedTopics) : [];
  };

  const deleteTopic = (id) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      const updatedTopics = topics.filter(topic => topic.id !== id);
      setTopics(updatedTopics);
      localStorage.setItem('topics', JSON.stringify(updatedTopics));
    }
  };

  useEffect(() => {
    setTopics(getTopicsFromLocalStorage());
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Group Decision-Making</h1>
        <button
          type="button"
          onClick={() => navigate('/notifications')}
          style={styles.notificationsIcon}
        >
          🔔
        </button>
      </header>
      <button
        type="button"
        onClick={() => navigate('/create-topic')}
        style={styles.createButton}
      >
        + Create New Topic
      </button>
      <ul style={styles.topicList}>
        {topics.map((topic) => (
          <li key={topic.id} style={styles.topicItem}>
            <div>
              <h3>{topic.title}</h3>
              <p>Status: {topic.status}</p>
            </div>
            <div style={styles.buttonContainer}>
              <button
                type="button"
                onClick={() => navigate(`/discussion/${topic.id}`)}
                style={styles.viewButton}
              >
                View
              </button>
              <button
                type="button"
                onClick={() => deleteTopic(topic.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Home;
