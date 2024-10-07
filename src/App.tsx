// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Commands from './components/Commands/Commands';
import Leaderboard from './components/Leaderboard/Leaderboard';
import NotFound from './components/NotFound';
import './index.css';
import Redirect from './components/Utils/Redirect';
import ApiDocs from './components/Utils/Docs/Docs';
import Footer from './components/Footer';
import User from './components/User/User'

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-neutral-900 p-3 relative min-h-screen">
        <img
          src="https://potat.app/Home.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        />
        <div className="relative z-10 max-w-full mx-auto p-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/api/docs" element={<ApiDocs />} />
            <Route path="/u/:username" element={<User />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
