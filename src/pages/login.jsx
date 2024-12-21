import '../styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <div className="bg-[rgb(128, 128, 128)] m-auto h-[50px] w-[50px]"></div>
      <div className="userFields">
        <input className="field" type="text" placeholder="  Email"></input>
        <input
          className="field"
          type="password"
          placeholder="  Password"
        ></input>
        <button className="loginField field">Log in</button>
      </div>
      <footer>
        New Here. <Link to="/signup">Sign up here.</Link>
      </footer>
    </div>
  );
};

export default Login;
