import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('Attempting login with:', API_ENDPOINTS.login);
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (data.status === 'success' && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/mainPage');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <>
      <div className="navbar">
        <nav>
          <h1 className="logo-text">NEXUS</h1>
        </nav>
      </div>
      <div className="login">
        <div className="logo">
          <img src="/images/nexuslogo.png" alt="NEXUS Logo" />
        </div>
        <div className="userFields">
          <input
            className="field"
            type="email"
            placeholder="  Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            className="field"
            type="password"
            placeholder="  Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button className="loginField field" onClick={handleSubmit}>
            Login
          </button>
          {error && <div className="error">{error}</div>}
        </div>
        <div className="footer-container">
          <footer className="text-link">
            Don't have an account? <Link to="/signup">Sign up here.</Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Login;
