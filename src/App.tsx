import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Commands from './components/Commands/Commands';
import Leaderboard from './components/Leaderboard/Leaderboard';
import NotFound from './components/NotFound';
import './index.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border border-neutral-600 bg-neutral-800/50 text-white text-center py-6 mt-4 rounded-xl backdrop-blur-xl flex flex-col items-center justify-center space-y-2 z-20">
      <p className="text-md text-neutral-400">&copy; {currentYear} PotatBotat. All Rights Reserved.</p>
      <div className="flex items-center space-x-2 font-extralight text-sm">
        <p>
          Made by{' '}
          <a
            href="https://twitter.com/prodbyeagle"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 transform eagle-text hover:font-black"

          >
            @prodbyeagle
          </a>
        </p>
        <img
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f49c/512.webp"
          alt="Herz"
          className="w-4 h-4"
        />
      </div>
    </footer>
  );
};

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
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;