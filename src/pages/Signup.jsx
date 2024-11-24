import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex flex-col items-center pt-14 min-h-screen h-full w-full">
      <div className="bg-white h-20 w-20 rounded-xl my-20"></div>
      <div className="flex flex-col h-full w-full max-w-[400px] gap-12 px-4">
        <div className="flex flex-col gap-6">
          <input
            className="h-12 w-full  rounded-xl px-4"
            type="text"
            placeholder="Username"
          />
          <input
            className="h-12 w-full  rounded-xl px-4"
            type="email"
            placeholder="Email"
          />
          <input
            className="h-12 w-full  rounded-xl px-4"
            type="password"
            placeholder="Password"
          />
          <input
            className="h-12 w-full  rounded-xl px-4"
            type="password"
            placeholder="Retype Password"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <button className="bg-secondary h-12 w-full rounded-xl text-white">
            Sign Up
          </button>
          <div className="flex items-start">
            <input type="checkbox" className="mt-[2px]" id="checkbox" />
            <label
              htmlFor="checkbox"
              className="text-white text-xs text-center ml-[2px]"
            >
              I confirm that I have read and agree to the Terms of Service and
              Privacy Policy.
            </label>
          </div>
        </div>
        <Link className="text-white mt-10 py-2 text-center" to="/login">
          Already have an account? Sign in here.
        </Link>
      </div>
    </div>
  );
};

export default Signup;
