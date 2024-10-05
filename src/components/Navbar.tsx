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


   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const target = event.target as Node;
         const clickedElement = target as HTMLElement;

         const dropdownClicked = dropdownRef.current?.contains(clickedElement);
         const hamburgerClicked = clickedElement.closest('.hamburger') !== null;
         const menuClicked = document.querySelector('.absolute.top-16')?.contains(clickedElement);

         if (!dropdownClicked && !hamburgerClicked && !menuClicked) {
            closeDropdown();
            closeMenu();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <nav className="border border-neutral-600 bg-neutral-800/50 text-white text-md rounded-xl backdrop-blur-xl p-6 shadow-lg mb-4 flex items-center justify-between z-50 relative">
         <NavLink to="/" className="mr-4">
            <img
               src="https://potat.app/tatoExplode.gif"
               alt="Home"
               className="w-10 h-10 object-contain hover:animate-spin"
            />
         </NavLink>

         <div className="hidden md:flex flex-grow justify-center space-x-2 items-center">
            <NavLink
               to="/commands"
               className={({ isActive }) =>
                  `py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700/50 text-white' : 'hover:bg-neutral-600'}`
               }
            >
               Commands
            </NavLink>
            <NavLink
               to="/leaderboard"
               className={({ isActive }) =>
                  `py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700/50 text-white' : 'hover:bg-neutral-600'}`
               }
            >
               Leaderboard
            </NavLink>
            <li className="relative flex items-center">
               <button
                  onClick={toggleDropdown}
                  className={`py-2 px-4 rounded-md transition duration-100 hover:bg-neutral-600 text-center`}
               >
                  Utils
               </button>
               {dropdownOpen && (
                  <ul
                     ref={dropdownRef}
                     className="absolute left-0 text-center top-full mt-2 p-1 w-48 backdrop-blur-md bg-neutral-600/30 border border-neutral-600 rounded-md shadow-lg z-50"
                  >
                     <li>
                        <NavLink
                           to="/redirect"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md mb-2 transition duration-100 hover:bg-neutral-600  ${isActive ? 'bg-neutral-700 text-yellow-400' : 'text-white'}`
                           }
                        >
                           URL Shortener
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/api/docs"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md transition duration-100 hover:bg-neutral-600 ${isActive ? 'bg-neutral-700 hover:bg-neutral-600 text-yellow-400' : 'text-white'}`
                           }
                        >
                           API Docs
                        </NavLink>
                     </li>
                  </ul>
               )}
            </li>
         </div>

         <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="hamburger p-2 focus:outline-none">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
               </svg>
            </button>
         </div>

         {menuOpen && (
            <div className="absolute top-24 left-0 right-0 bg-neutral-800/50 border border-neutral-600 backdrop-blur-md rounded-md p-1 shadow-2xl z-50">
               <ul className="flex flex-col space-y-1">
                  <li>
                     <NavLink
                        to="/commands"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
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
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
                        }
                     >
                        Leaderboard
                     </NavLink>

                  </li>
                  <li>
                     <NavLink
                        to="/redirect"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
                        }
                     >
                        URL Shortener
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to="/api/docs"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-600'}`
                        }
                     >
                        API Docs
                     </NavLink>
                  </li>
               </ul>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
