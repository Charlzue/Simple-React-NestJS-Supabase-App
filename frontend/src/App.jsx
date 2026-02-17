import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://simple-react-nest-js-supabase-app.vercel.app/guestbook'; 

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_URL);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !newMessage) return;

    try {
      await axios.post(API_URL, { name, message: newMessage });
      setName('');
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="profile-section">
        <h1>Your Name</h1>
        <h3>Full Stack Developer</h3>
        <p>Welcome to my personal profile! I specialize in React, NestJS, and building cool web applications.</p>
      </div>

      <div className="guestbook-section">
        <h2>Guestbook</h2>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Leave a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flex: 2 }}
            />
            <button type="submit">Sign Guestbook</button>
          </div>
        </form>

        <div>
          {messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <div>
                <strong>{msg.name}</strong>
                <p style={{ margin: '5px 0' }}>{msg.message}</p>
                <small style={{ color: '#666' }}>
                  {new Date(msg.created_at).toLocaleDateString()}
                </small>
              </div>
              <button className="delete" onClick={() => handleDelete(msg.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;