import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/profilesetup');
  };

  return (
    <div className="signup">
      <div className="logo"></div>
      <div className="userFields">
        <input className="field" type="text" placeholder="  Email" />
        <input className="field" type="password" placeholder="  Password" />
        <input
          className="field"
          type="password"
          placeholder="  Retype Password"
        />
        <button className="loginField field" onClick={handleSignUp}>
          Sign Up
        </button>

        <div className="checkbox-container">
          <input type="checkbox" id="terms" />
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
