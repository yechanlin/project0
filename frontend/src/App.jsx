import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import ProfileSetup from './pages/profilesetup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profilesetup" element={<ProfileSetup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
