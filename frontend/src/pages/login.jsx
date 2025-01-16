import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const responseData = await response.json(); // Parse the response JSON

      console.log(response.ok); // Debugging
      if (!response.ok) {
        const errorMessage = responseData.message || 'Failed to log in';
        throw new Error(errorMessage);
      }

      navigate('/profilesetup');
    } catch (error) {
      setError(error.message);
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
        <img src="./src/components/img/nexuslogo.png" />
    </div>
      <div className="bg-[rgb(128, 128, 128)] m-auto h-[50px] w-[50px]"></div>
      <div className="userFields">
        <input
          className="field"
          type="text"
          name="email"
          value={formData.email}
          placeholder="  Email"
          onChange={handleChange}
        ></input>
        <input
          className="field"
          name="password"
          type="password"
          placeholder="  Password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button className="loginField field" onClick={handleLogin}>
          Log in
        </button>
        {error && <div className="error">{error}</div>}
      </div>
      <footer>
        New Here. <Link to="/signup">Sign up here.</Link>
      </footer>
    </div>
    </>
  );
};

export default Login;
