import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './components/Home';
import CreateTopic from './components/CreateTopic';
import TopicDiscussion from './components/TopicDiscussion';
import Notifications from './components/Notifications';
import ShareScreen from './components/ShareScreen';


const App = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/create-topic', element: <CreateTopic /> },
    { path: '/discussion/:topicId', element: <TopicDiscussion /> },
    { path: '/notifications', element: <Notifications /> },
    { path: '/share/:topicId', element: <ShareScreen /> },
  ]);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        {routes}
      </div>
    </div>
  );
};

export default App;