import React, { useEffect, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { NavLink } from 'react-router-dom';
import Tooltip from './Tooltip';

const Navbar: React.FC = () => {
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const [menuOpen, setMenuOpen] = useState<boolean>(false);
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // user is already logged in can be disabled tho.
   const dropdownRef = useRef<HTMLUListElement | null>(null);
   const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
   const [badgeImage, setBadgeImage] = useState<string | null>(null);

   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
   const closeDropdown = () => setDropdownOpen(false);
   const toggleMenu = () => setMenuOpen(!menuOpen);
   const closeMenu = () => setMenuOpen(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);

      const handleClickOutside = (event: MouseEvent) => {
         const target = event.target as Node;
         const clickedElement = target as HTMLElement;

         const dropdownClicked = dropdownRef.current?.contains(clickedElement);
         const menuClicked = document.querySelector('.absolute.top-24')?.contains(clickedElement);

         if (!dropdownClicked && !menuClicked) {
            closeDropdown();
            closeMenu();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         window.removeEventListener('resize', handleResize);
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   useEffect(() => {
      const fetchBadge = async () => {
         try {
            const response = await fetch('https://chatterinohomies.com/api/badges/list');
            const data = await response.json();

            if (Array.isArray(data.badges)) {
               const userBadge = data.badges.find((badge: { username: string }) => badge.username === 'prodbyeagle');
               if (userBadge) {
                  setBadgeImage(userBadge.image3);
               }
            } else {
               console.error('Expected badges to be an array, but received:', data.badges);
            }
         } catch (error) {
            console.error('Failed to fetch badge:', error);
         }
      };
      fetchBadge();
   }, []);

   const utcTimestamp = "2023-12-23T01:20:10.645Z"; // first seen timestamp from prodbyeagle
   const getTimeDifference = (utcString: string) => {
      const date = new Date(utcString);
      return formatDistanceToNow(date, { addSuffix: true });
   };

   return (
      <nav className="border border-neutral-600 bg-neutral-800/50 text-white text-md rounded-xl backdrop-blur-xl p-2 shadow-lg mb-4 flex items-center justify-between z-50 relative">
         <NavLink to="/" className="mr-4">
            <img
               src="https://potat.app/tatoExplode.gif"
               alt="Home"
               className="w-10 h-10 rounded-lg p-1 object-contain transition-all duration-100 hover:bg-neutral-600/50"
            />
         </NavLink>

         <div className="hidden md:flex flex-grow justify-center space-x-2 items-center">
            <NavLink
               to="/"
               className={({ isActive }) =>
                  `py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-600/50 text-white' : 'hover:bg-neutral-700/50'}`
               }
            >
               Home
            </NavLink>
            <NavLink
               to="/commands"
               className={({ isActive }) =>
                  `py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-600/50 text-white' : 'hover:bg-neutral-700/50'}`
               }
            >
               Commands
            </NavLink>
            <NavLink
               to="/leaderboard"
               className={({ isActive }) =>
                  `py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-600/50 text-white' : 'hover:bg-neutral-700/50'}`
               }
            >
               Leaderboard
            </NavLink>
            <li className="relative flex items-center">
               <button
                  onClick={toggleDropdown}
                  className={`py-2 px-4 rounded-md transition duration-100 hover:bg-neutral-600/50 text-center`}
               >
                  Utils
               </button>
               {dropdownOpen && (
                  <ul
                     ref={dropdownRef}
                     className="absolute left-0 text-center top-full mt-2 p-1 w-48 backdrop-blur-md bg-neutral-600/30 border border-neutral-600 rounded-md shadow-lg z-50"
                  >
                     <li key="urlShortener">
                        <NavLink
                           to="/redirect"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md mb-1 transition duration-100 hover:bg-neutral-700/50  ${isActive ? 'bg-neutral-700/50 text-yellow-400' : 'text-white'}`
                           }
                        >
                           URL Shortener
                        </NavLink>
                     </li>
                     <li key="apiDocs">
                        <NavLink
                           to="/api/docs"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md mb-1 transition duration-100 hover:bg-neutral-700/50 ${isActive ? 'bg-neutral-700/50 hover:bg-neutral-700/50 text-yellow-400' : 'text-white'}`
                           }
                        >
                           API Docs
                        </NavLink>
                     </li>
                     <li key="haste">
                        <NavLink
                           to="https://haste.potat.app/"
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md mb-1 transition duration-100 hover:bg-neutral-700/50 ${isActive ? 'bg-neutral-700/50 hover:bg-neutral-700/50 text-yellow-400' : 'text-white'}`
                           }
                        >
                           Haste
                        </NavLink>
                     </li>
                     <li key="emoteSearch">
                        <NavLink
                           to="/emotes/search"
                           onClick={closeDropdown}
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md transition duration-100 hover:bg-neutral-700/50 ${isActive ? 'bg-neutral-700 hover:bg-neutral-700/50 text-yellow-400' : 'text-white'}`
                           }
                        >
                           Emote Search
                        </NavLink>
                     </li>
                     <li key="connections">
                        <NavLink
                           to="#"
                           className={({ isActive }) =>
                              `block py-2 px-4 rounded-md mb-1 transition duration-100 cursor-default text-gray-500`
                           }
                        >
                           Connections
                        </NavLink>
                     </li>
                  </ul>
               )}
            </li>
         </div>

         <div className="md:hidden flex items-center">
            <Tooltip content='Hi' position='left'>
               <button onClick={toggleMenu} className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-neutral-600/50 transition-all">
                  <img
                     src="https://avatars.githubusercontent.com/u/124641014?s=96&v=4"
                     alt="User Avatar"
                     className="w-8 h-8 rounded-full cursor-pointer hover:bg-neutral-600/50 transition-all"
                  />
               </button>
            </Tooltip>
         </div>

         {menuOpen && (
            <div className="absolute top-24 left-0 right-0 bg-neutral-800/50 border border-neutral-600 backdrop-blur-md rounded-md p-1 shadow-2xl z-50">
               <ul className="flex flex-col space-y-1">
                  <li key="commands">
                     <NavLink
                        to="/commands"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700/50'}`
                        }
                     >
                        Commands
                     </NavLink>
                  </li>
                  <li key="leaderboard">
                     <NavLink
                        to="/leaderboard"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700/50'}`
                        }
                     >
                        Leaderboard
                     </NavLink>
                  </li>
                  <li key="urlShortenerMenu">
                     <NavLink
                        to="/redirect"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700/50'}`
                        }
                     >
                        URL Shortener
                     </NavLink>
                  </li>
                  <li key="apiDocsMenu">
                     <NavLink
                        to="/api/docs"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700/50'}`
                        }
                     >
                        API Docs
                     </NavLink>
                  </li>
                  <li key="haste">
                     <NavLink
                        to="https://haste.potat.app/"
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700/50'}`
                        }
                     >
                        Haste
                     </NavLink>
                  </li>
                  <li key="emoteSearch">
                     <NavLink
                        to="/emotes/search"
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700/50'}`
                        }
                     >
                        Emote Search
                     </NavLink>
                  </li>
                  <li key="connections">
                     <NavLink
                        to="#"
                        className={({ isActive }) =>
                           `block py-2 px-4 rounded-md transition duration-100 cursor-default text-gray-500`
                        }
                     >
                        Connections
                     </NavLink>
                  </li>
               </ul>
            </div>
         )}

         {!isMobile && (
            <Tooltip position="left" content={`Joined: ${getTimeDifference(utcTimestamp)}`}>
               <div className="flex items-center space-x-4 transition-all duration-100 rounded-lg hover:bg-neutral-700/50 backdrop-blur-lg p-1">
                  {isLoggedIn ? (
                     <div className="flex items-center space-x-2">
                        <img
                           src="https://avatars.githubusercontent.com/u/124641014?s=96&v=4"
                           alt="User Avatar"
                           className="w-8 h-8 rounded-full"
                        />
                        <span
                           style={{
                              backgroundImage: "radial-gradient(circle, rgb(238, 255, 0) 0%, rgb(166, 255, 0) 50%, rgb(93, 195, 9) 100%)",
                              filter: "drop-shadow(rgb(189, 225, 9) 0px 0px 4px)",
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              color: 'transparent',
                              backgroundSize: '100% auto',
                              display: 'inline-block',
                           }}
                           className="text-sm font-semibold"
                        >
                           @prodbyeagle
                        </span>
                        {badgeImage && <img src={badgeImage} alt="Badge" className="w-5 h-5" />}
                     </div>
                  ) : (
                     <button
                        onClick={() => setIsLoggedIn(true)}
                        className="px-2 py-2 text-sm rounded-md bg-neutral-700 text-white hover:bg-neutral-700/50 transition duration-100"
                     >
                        Sign In
                     </button>
                  )}
               </div>
            </Tooltip>
         )}
      </nav>
   );
};

export default Navbar;
