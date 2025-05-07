import './App.css';
import React, { useState}  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserTypeSelectionPage from './pages/UserType';

function App() {
 // const [loggedIn, setLoggedIn] = useState(false);
  //const [showRegister, setShowRegister] = useState(false);
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/usertype" element={<UserTypeSelectionPage />} />
        {/* Add more routes like /services, /tasks, /community etc. */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
