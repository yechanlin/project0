import Signup from './pages/signup.jsx'
import Home from './pages/index.jsx'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
