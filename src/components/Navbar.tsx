import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
   return (
      <nav className="bg-neutral-800/50 text-white text-md rounded-xl backdrop-blur-xl p-6 shadow-lg mb-8">
         <ul className="flex justify-center space-x-4">
            <li>
               <NavLink
                  to="/"
                  className={({ isActive }) =>
                     `py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'
                     }`
                  }
               >
                  Home
               </NavLink>
            </li>
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
