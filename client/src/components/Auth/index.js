import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = ({ setIsAdminConnected }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const adminURI = `mongodb+srv://${username}:${password}@ceramicscool.rsu54.mongodb.net/ceramics_store?retryWrites=true&w=majority&appName=ceramicscool`;
    
    try {
      // Test the connection to MongoDB
      await axios.get('/api/test-connection', { params: { uri: adminURI } });
      console.log(setIsAdminConnected);
      setIsAdminConnected(true);
      navigate('/manage');
    } catch (err) {
      console.log('Failed to connect as admin:', err);
      setError('Authentication failed. Please check your username and password.');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Admin Authentication</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Authenticate</button>
      </form>
    </div>
  );
};

export default Auth;