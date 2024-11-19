import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const topics = [
    { id: 1, title: 'Weekend Trip Destination', status: 'Ongoing' },
    { id: 2, title: 'Project Theme', status: 'Finalized' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Group Decision-Making</h1>
      <button
        type="button"
        onClick={() => navigate('/create-topic')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        + Create New Topic
      </button>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          marginTop: '20px',
          borderTop: '1px solid #ddd',
        }}
      >
        {topics.map((topic) => (
          <li
            key={topic.id}
            style={{
              padding: '15px 10px',
              borderBottom: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>{topic.title}</h3>
              <p style={{ margin: '5px 0', color: '#666' }}>Status: {topic.status}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/discussion/${topic.id}`)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2196F3',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
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
