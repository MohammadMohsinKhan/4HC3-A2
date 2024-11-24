import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const TopicDiscussion = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topics = JSON.parse(localStorage.getItem("topics"));
  const topic = topics.find((t) => parseInt(t.id, 10) === parseInt(topicId, 10));

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [filterOption, setFilterOption] = useState(""); // For filtering comments
  const [status, setStatus] = useState(topic?.status || "Ongoing");
  const [finalizedOption, setFinalizedOption] = useState(topic?.finalOption || null);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);

  // Load comments from localStorage or pre-fill with default
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("topicComments")) || {};
    const topicComments = storedData[topicId];

    if (topicComments) {
      setComments(topicComments);
    } else {
      const defaultComments = topic?.comments || [];
      updateLocalStorage(topicId, defaultComments);
      setComments(defaultComments);
    }
  }, [topicId, topic]);

  const updateLocalStorage = (id, updatedComments) => {
    const storedData = JSON.parse(localStorage.getItem("topicComments")) || {};
    storedData[id] = updatedComments;
    localStorage.setItem("topicComments", JSON.stringify(storedData));
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedOption) {
      alert("Please write a comment and select an option.");
      return;
    }

    const newCommentObject = {
      id: comments.length + 1,
      author: "You",
      option: selectedOption,
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    const updatedComments = [newCommentObject, ...comments];
    setComments(updatedComments);
    setNewComment("");
    setSelectedOption("");
    updateLocalStorage(topicId, updatedComments);
  };

  const handleFinalize = (option) => {
    setFinalizedOption(option);
    setStatus("Finalized");
    setShowFinalizeModal(false);

    const storedTopics = JSON.parse(localStorage.getItem("topics")) || [];
    const updatedTopics = storedTopics.map((t) =>
      t.title === topic.title ? { ...t, status: "Finalized", finalOption: option } : t
    );
    localStorage.setItem("topics", JSON.stringify(updatedTopics));
  };

  const calculateMetrics = () => {
    const count = {};
    comments.forEach((comment) => {
      count[comment.option] = (count[comment.option] || 0) + 1;
    });

    const mostChosen = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
    return {
      count,
      mostChosenOption: mostChosen ? mostChosen[0] : null,
    };
  };

  const metrics = calculateMetrics();

  // Filter comments based on the selected filter option
  const filteredComments = filterOption
    ? comments.filter((comment) => comment.option === filterOption)
    : comments;

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

      <div style={styles.statusContainer}>
        <p style={styles.statusText}>
          Status: <strong>{status}</strong>
        </p>
        {status === "Finalized" && finalizedOption && (
          <p style={styles.finalizedText}>
            Finalized Option: <strong>{finalizedOption}</strong>
          </p>
        )}
      </div>

      <div style={styles.optionsContainer}>
        <h3 style={styles.optionsTitle}>Options:</h3>
        <ul style={styles.optionsList}>
          {topic.options.map((option, index) => (
            <li key={index} style={styles.optionItem}>
              {option} - Votes: {metrics.count[option] || 0}
            </li>
          ))}
        </ul>
      </div>

      {status === "Ongoing" && (
        <button
          style={styles.finalizeButton}
          onClick={() => setShowFinalizeModal(true)}
        >
          Finalize Discussion
        </button>
      )}

      {status === "Ongoing" && (
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
      )}

      <div style={styles.filterContainer}>
        <label htmlFor="filter" style={styles.filterLabel}>
          Filter Comments by Option:
        </label>
        <select
          id="filter"
          style={styles.dropdown}
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="">All</option>
          {topic.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.commentsContainer}>
        <h3 style={styles.subheader}>Comments:</h3>
        {filteredComments.map((comment) => (
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

      {showFinalizeModal && (
        <div style={styles.modal}>
          <h2>Finalize Discussion</h2>
          <p>
            Most chosen option:{" "}
            <strong>{metrics.mostChosenOption || "No comments yet"}</strong>
          </p>
          <ul style={styles.modalOptions}>
            {topic.options.map((option, index) => (
              <li key={index}>
                <button
                  style={styles.modalOptionButton}
                  onClick={() => handleFinalize(option)}
                >
                  Finalize with "{option}"
                </button>
              </li>
            ))}
          </ul>
          <button
            style={styles.closeModalButton}
            onClick={() => setShowFinalizeModal(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  filterContainer: {
    marginTop: '16px',
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
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '16px',
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
    width: '100%', // Ensure it spans the container
  padding: '12px', // Add padding for a comfortable touch target
  fontSize: '16px', // Increase font size for better readability
  fontFamily: 'Arial, sans-serif', // Use a clean font
  color: '#333', // Neutral text color
  border: '1px solid #ccc', // Subtle border
  borderRadius: '6px', // Rounded corners for a modern look
  backgroundColor: '#f9f9f9', // Light background
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a slight shadow for depth
  transition: 'all 0.3s ease', // Smooth transitions for hover/focus
  cursor: 'pointer', // Pointer cursor for dropdown interaction
  appearance: 'none', // Remove default browser styles
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
  finalizeButton: {
    padding: '10px 16px',
    backgroundColor: '#FF9800',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    margin: '10px 0',
  },
  statusContainer: {
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  statusText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  finalizedText: {
    fontSize: '14px',
    color: '#4CAF50',
  },
  modal: {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  modalOptions: {
    listStyleType: 'none',
    padding: 0,
    margin: '10px 0',
  },
  modalOptionButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '8px',
  },
  closeModalButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '12px',
  },
};

export default TopicDiscussion;
