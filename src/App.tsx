import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './index.css';
import Commands from './components/Commands';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-neutral-900 relative">
        {/* Hintergrundbild mit Opazität */}
        <img
          src="https://potat.app/Home.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="container mx-auto p-4 relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/leaderboard" element={<div className="bg-neutral-800/80 backdrop-blur-xl border border-neutral-400 rounded-lg p-8 shadow-lg">Leaderboard Page</div>} />
            <Route path="/utils" element={<div className="bg-neutral-800/80 backdrop-blur-xl border border-neutral-400 rounded-lg p-8 shadow-lg">Utils Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
