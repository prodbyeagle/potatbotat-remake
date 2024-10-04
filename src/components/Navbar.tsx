import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
   return (
      <nav className="border border-neutral-600 bg-neutral-800/50 text-white text-md rounded-xl backdrop-blur-xl p-6 shadow-lg mb-8 flex items-center">
         {/* GIF in der linken Ecke */}
         <NavLink to="/" className="mr-4">
            <img
               src="https://potat.app/tatoExplode.gif"
               alt="Home"
               className="w-10 h-10 object-contain" // Größe anpassen
            />
         </NavLink>

         {/* Navigationslinks zentriert */}
         <ul className="flex-grow flex justify-center space-x-4">
            <li>
               <NavLink
                  to="/commands"
                  className={({ isActive }) =>
                     `py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'
                     }`
                  }
               >
                  Commands
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/leaderboard"
                  className={({ isActive }) =>
                     `py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'
                     }`
                  }
               >
                  Leaderboard
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/utils"
                  className={({ isActive }) =>
                     `py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'
                     }`
                  }
               >
                  Utils
               </NavLink>
            </li>
         </ul>
      </nav>
   );
};

export default Navbar;
