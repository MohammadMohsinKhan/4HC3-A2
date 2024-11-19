import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton'; // Assume BackButton is a reusable component

const TopicDiscussion = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  // Mock topic data
  const mockTopics = {
    "1": {
      title: "Weekend Trip Destination",
      options: ["Beach", "Mountains", "City"],
      comments: [
        { id: 1, author: "Alice", option: "Beach", content: "I love the beach!", timestamp: "Nov 18, 2024" },
        { id: 2, author: "Bob", option: "Mountains", content: "The mountains are so peaceful.", timestamp: "Nov 18, 2024" },
      ],
    },
    "2": {
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

  const topic = mockTopics[topicId];

  // State to manage comments
  const [comments, setComments] = useState(topic?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  if (!topic) {
    return (
      <div style={styles.container}>
        <BackButton />
        <h1 style={styles.header}>Topic Not Found</h1>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedOption) {
      alert("Please write a comment and select an option.");
      return;
    }

    const newCommentObject = {
      id: comments.length + 1,
      author: "You", // Mock author
      option: selectedOption,
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    // Update comments state
    setComments([newCommentObject, ...comments]);
    setNewComment(""); // Clear input
    setSelectedOption(""); // Clear selected option
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerButtons}>
          <BackButton />
          <button
            style={styles.shareButton}
            onClick={() => navigate(`/share/${topicId}`)}
          >
            Share Topic
          </button>
        </div>
        <h1 style={styles.title}>{topic.title}</h1>
      </header>
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
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Write a comment..."
          style={styles.input}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <select
          style={styles.dropdown}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {topic.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button style={styles.commentButton} onClick={handleAddComment}>
          Send
        </button>
      </div>
      <div style={styles.commentsContainer}>
        <h3 style={styles.subheader}>Comments:</h3>
        {comments.map((comment) => (
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
    </div>
  );
};

const styles = {
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
  container: {
    padding: '16px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '20px',
  },
  headerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    color: '#333',
    marginTop: '10px',
    textAlign: 'center',
  },
  shareButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
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
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  dropdown: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  commentButton: {
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default TopicDiscussion;
