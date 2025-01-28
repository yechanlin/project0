import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

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
          <img src="./src/components/img/nexuslogo.png" alt="NEXUS Logo" />
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
