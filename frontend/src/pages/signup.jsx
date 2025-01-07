import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignUp = async () => {
    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.retypePassword,
        }),
      });
      const responseData = await response.json(); // Parse the response JSON

      console.log(response.ok); // Debugging
      if (!response.ok) {
        const errorMessage = responseData.message || 'Failed to sign up';
        throw new Error(errorMessage);
      }

      navigate('/profilesetup');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <div className="logo"></div>
      <div className="userFields">
        <input
          className="field"
          type="text"
          name="email"
          placeholder="  Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="field"
          type="password"
          name="password"
          placeholder="  Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className="field"
          type="password"
          name="retypePassword"
          placeholder="  Retype Password"
          value={formData.retypePassword}
          onChange={handleChange}
        />
        <button className="loginField field" onClick={handleSignUp}>
          Sign Up
        </button>
        {error && <div className="error">{error}</div>}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="terms"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <label htmlFor="terms">
            I confirm that I have read and agree to Terms of Service and Privacy
            Policy.
          </label>
        </div>
      </div>
      <div className="footer-container">
        <footer className="text-blue-700">
          Already have an account? <Link to="/">Log in here.</Link>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
