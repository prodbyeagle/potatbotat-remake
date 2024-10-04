import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Commands from './components/Commands/Commands';
import Leaderboard from './components/Leaderboard/Leaderboard';
import './index.css';

// Footer-Komponente
// const Footer: React.FC = () => {
//   return (
//     <footer className="border border-neutral-600 bg-neutral-800/50 text-white text-center py-4 mt-8 rounded-xl backdrop-blur-xl flex items-center justify-center z-20">
//       <p>Made by @prodbyeagle</p>
//       <img
//         src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f49c/512.webp"
//         alt="Herz"
//         className="w-6 h-6 ml-2"
//       />
//     </footer>
//   );
// };

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-neutral-900 p-3 relative min-h-screen">
        <img
          src="https://potat.app/Home.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        />

        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
