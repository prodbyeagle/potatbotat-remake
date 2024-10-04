import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const [menuOpen, setMenuOpen] = useState<boolean>(false);
   const dropdownRef = useRef<HTMLUListElement | null>(null);

   const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
   };

   const closeDropdown = () => {
      setDropdownOpen(false);
   };

   const toggleMenu = () => {
      setMenuOpen(!menuOpen);
   };

   const closeMenu = () => {
      setMenuOpen(false);
   };

   const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
         closeDropdown();
      }
      if (target instanceof HTMLElement && !target.closest('.hamburger')) {
         closeMenu();
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
      //eslint-disable-next-line
   }, []);

   return (
      <nav className="border border-neutral-600 bg-neutral-800/50 text-white text-md rounded-xl backdrop-blur-xl p-6 shadow-lg mb-8 flex items-center justify-between z-50">
         <NavLink to="/" className="mr-4">
            <img
               src="https://potat.app/tatoExplode.gif"
               alt="Home"
               className="w-10 h-10 object-contain hover:animate-spin"
            />
         </NavLink>

         <div className="hidden md:flex flex-grow justify-center space-x-4 items-center">
            <NavLink
               to="/commands"
               className={({ isActive }) =>
                  `py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
               }
            >
               Commands
            </NavLink>
            <NavLink
               to="/leaderboard"
               className={({ isActive }) =>
                  `py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
               }
            >
               Leaderboard
            </NavLink>
            {/* <li className="relative flex items-center">
               <button
                  onClick={toggleDropdown}
                  className={`py-2 px-4 rounded-md transition duration-300 hover:bg-neutral-600 text-left`}
               >
                  Utils
               </button>
               {dropdownOpen && (
                  <ul ref={dropdownRef} className="absolute left-4 top-10 mt-2 w-48 bg-neutral-700 border border-neutral-600 rounded-md shadow-lg z-50">
                     <li>
                        <NavLink
                           to="/utils/tool1"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md hover:bg-neutral-600 ${isActive ? 'bg-neutral-600 text-yellow-400' : 'text-white'}`
                           }
                        >
                           Tool 1
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/utils/tool2"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md hover:bg-neutral-600 ${isActive ? 'bg-neutral-600 text-yellow-400' : 'text-white'}`
                           }
                        >
                           Tool 2
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/utils/tool3"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md hover:bg-neutral-600 ${isActive ? 'bg-neutral-600 text-yellow-400' : 'text-white'}`
                           }
                        >
                           Tool 3
                        </NavLink>
                     </li>
                  </ul>
               )}
            </li> */}
         </div>

         <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="hamburger p-2 focus:outline-none">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
               </svg>
            </button>
         </div>

         {menuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-neutral-800 rounded-md shadow-lg z-50">
               <ul className="flex flex-col space-y-1">
                  <li>
                     <NavLink
                        to="/commands"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
                        }
                     >
                        Commands
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to="/leaderboard"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-300 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
                        }
                     >
                        Leaderboard
                     </NavLink>
                  </li>
                  <li className="relative flex items-center">
                     <button
                        onClick={toggleDropdown}
                        className={`block w-full py-2 px-4 rounded-md transition duration-300 hover:bg-neutral-600 text-left`}
                     >
                        Utils
                     </button>
                     {dropdownOpen && (
                        <ul ref={dropdownRef} className="mt-2 w-full bg-neutral-700 border border-neutral-600 rounded-md shadow-lg">
                           <li>
                              <NavLink
                                 to="/utils/tool1"
                                 onClick={closeDropdown}
                                 className={({ isActive }) =>
                                    `block py-2 px-4 rounded-md hover:bg-neutral-600 ${isActive ? 'bg-neutral-600 text-yellow-400' : 'text-white'}`
                                 }
                              >
                                 Tool 1
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 to="/utils/tool2"
                                 onClick={closeDropdown}
                                 className={({ isActive }) =>
                                    `block py-2 px-4 rounded-md hover:bg-neutral-600 ${isActive ? 'bg-neutral-600 text-yellow-400' : 'text-white'}`
                                 }
                              >
                                 Tool 2
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 to="/utils/tool3"
                                 onClick={closeDropdown}
                                 className={({ isActive }) =>
                                    `block py-2 px-4 rounded-md hover:bg-neutral-600 ${isActive ? 'bg-neutral-600 text-yellow-400' : 'text-white'}`
                                 }
                              >
                                 Tool 3
                              </NavLink>
                           </li>
                        </ul>
                     )}
                  </li>
               </ul>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
