import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex flex-col items-center pt-14 min-h-screen h-full w-full">
      <div className="bg-white h-20 w-20 rounded-xl my-20"></div>
      <div className="flex flex-col w-full max-w-96 gap-12 px-4">
        <div className="flex flex-col gap-6">
          <input
            className="h-12 w-full  rounded-xl px-4"
            type="text"
            placeholder="Email"
          />
          <input
            className="h-12 w-full  rounded-xl px-4"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <button className="bg-secondary h-12 w-full rounded-xl text-white">
            Login
          </button>
          <Link className="text-white" to="/signup">
            New here? Sign up here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
