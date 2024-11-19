import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';

// Mock data for topics
const mockTopics = {
  1: {
    title: 'Weekend Trip Destination',
    options: ['Beach', 'Mountain', 'City'],
    comments: [
      {
        id: 1,
        author: 'Alice',
        option: 'Beach',
        content: 'I think the beach is a great idea for relaxation!',
        timestamp: '10:00 AM',
      },
      {
        id: 2,
        author: 'Bob',
        option: 'Mountain',
        content: 'I prefer the mountain—it’s cooler and more adventurous.',
        timestamp: '10:15 AM',
      },
      {
        id: 3,
        author: 'Charlie',
        option: 'City',
        content: 'Cities have great food and entertainment options!',
        timestamp: '10:30 AM',
      },
    ],
  },
  2: {
    title: 'Project Theme',
    options: ['AI', 'Blockchain', 'Cybersecurity'],
    comments: [
      {
        id: 1,
        author: 'Diana',
        option: 'AI',
        content: 'AI is cutting-edge and has many use cases!',
        timestamp: '2:00 PM',
      },
      {
        id: 2,
        author: 'Eve',
        option: 'Cybersecurity',
        content: 'Cybersecurity is essential in today’s digital world.',
        timestamp: '2:15 PM',
      },
    ],
  },
};

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
    optionsContainer: {
      marginBottom: '20px',
    },
    subheader: {
      fontSize: '16px',
      color: '#333',
      marginBottom: '10px',
    },
    optionsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    optionItem: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '5px',
    },
    commentsContainer: {
      marginBottom: '16px',
    },
    commentCard: {
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    commentAuthor: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '4px',
    },
    commentOption: {
      fontSize: '14px',
      color: '#4CAF50',
      marginBottom: '4px',
    },
    commentContent: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '4px',
    },
    commentTimestamp: {
      fontSize: '12px',
      color: '#999',
      textAlign: 'right',
    },
    inputContainer: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '8px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    input: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    },
    button: {
      padding: '10px 16px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
    },
  };

const TopicDiscussion = () => {
  const { topicId } = useParams();

  // Fetch topic data based on topicId
  const topic = mockTopics[topicId];

  // Check if topic exists
  if (!topic) {
    return (
      <div style={styles.container}>
        <BackButton />
        <h1 style={styles.header}>Topic Not Found</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <BackButton />
      <h1 style={styles.header}>{topic.title}</h1>
      <div style={styles.optionsContainer}>
        <h3 style={styles.subheader}>Available Options:</h3>
        <ul style={styles.optionsList}>
          {topic.options.map((option, index) => (
            <li key={index} style={styles.optionItem}>
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.commentsContainer}>
        <h3 style={styles.subheader}>Comments:</h3>
        {topic.comments.map((comment) => (
          <div key={comment.id} style={styles.commentCard}>
            <p style={styles.commentAuthor}>{comment.author}</p>
            <p style={styles.commentOption}>
              Chose: <strong>{comment.option}</strong>
            </p>
            <p style={styles.commentContent}>{comment.content}</p>
            <p style={styles.commentTimestamp}>{comment.timestamp}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Write a comment..."
          style={styles.input}
        />
        <button style={styles.button}>Send</button>
      </div>
    </div>
  );
};

export default TopicDiscussion;
