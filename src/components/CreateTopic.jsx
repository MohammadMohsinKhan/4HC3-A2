import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from './BackButton';

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
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      maxWidth: '400px', // Prevents the input from being too wide
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '14px',
      boxSizing: 'border-box', // Ensures padding and borders are included
    },
    optionsContainer: {
      marginBottom: '20px',
    },
    subheader: {
      fontSize: '16px',
      color: '#333',
      marginBottom: '10px',
    },
    optionItem: {
      marginBottom: '10px',
    },
    addButton: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    submitButton: {
      display: 'block',
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#2196F3',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };

const CreateTopic = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['']);
  const navigate = useNavigate();

  const addOption = () => setOptions([...options, '']);
  const updateOption = (index, value) =>
    setOptions(options.map((opt, i) => (i === index ? value : opt)));

  const createTopic = () => {
    if (!title.trim()) {
      alert('Topic title is required!');
      return;
    }
    const newTopic = {
      id: Date.now(),
      title,
      options,
      status: 'Ongoing',
      finalOption: null
    };

    const storedTopics = localStorage.getItem('topics');
    const topics = storedTopics ? JSON.parse(storedTopics) : [];
    topics.push(newTopic);
    localStorage.setItem('topics', JSON.stringify(topics));

    alert(`Topic "${title}" created with options: ${options.join(', ')}`);
    navigate('/');
  };

  return (
    <div style={styles.container}>
    <BackButton />
      <h1 style={styles.header}>Create a New Topic</h1>
      <div style={styles.formGroup}>
        <label style={styles.label}>Topic Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          placeholder="Enter your topic title"
        />
      </div>
      <div style={styles.optionsContainer}>
        <h3 style={styles.subheader}>Options:</h3>
        {options.map((option, index) => (
          <div key={index} style={styles.optionItem}>
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              style={styles.input}
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
        <button onClick={addOption} style={styles.addButton}>
          + Add Option
        </button>
      </div>
      <button onClick={createTopic} style={styles.submitButton}>
        Create Topic
      </button>
    </div>
  );
};

export default CreateTopic;
