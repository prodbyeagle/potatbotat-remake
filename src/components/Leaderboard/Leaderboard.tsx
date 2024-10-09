import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import LeaderboardEntry from './LeaderboardEntry';
import LeaderboardCategory from './LeaderboardCategory';
import { LeaderboardEntry as LeaderboardEntryType, LeaderboardType } from '../../types/Leaderboard';

const Leaderboard: React.FC = () => {
   const [leaderboard, setLeaderboard] = useState<LeaderboardEntryType[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [type, setType] = useState<LeaderboardType>('potatoes');

   const fetchLeaderboard = async () => {
      try {
         setLoading(true);
         const response = await fetch(`https://api.potat.app/leaderboard?type=${type}`);
         const data = await response.json();
         setLeaderboard(data.data);
      } catch (error) {
         console.error('Error fetching leaderboard:', error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchLeaderboard();
      // eslint-disable-next-line
   }, [type]);

   if (loading) {
      return <Loader />;
   }

   const filteredLeaderboard = leaderboard.filter((entry) =>
      entry.bestName.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="flex flex-col lg:flex-row lg:h-screen border border-neutral-600 bg-neutral-800/50 p-2 backdrop-blur-lg rounded-xl text-white z-auto">
         <LeaderboardCategory type={type} setType={setType} />

         <div className="flex-1">
            <div className="sticky top-0 rounded-md z-auto mb-2">
               <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[calc(100%-7px)] p-2 rounded-lg bg-neutral-800/40 border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-2 md:ml-2"
               />
            </div>

            {/* Leaderboard Content */}
            <div className="bg-transparent shadow-lg h-[calc(100vh-60px)] overflow-y-auto ml-0 md:ml-2">

               <ul className="space-y-2">
                  {filteredLeaderboard.length > 0 ? (
                     filteredLeaderboard.map((entry, index) => (
                        <LeaderboardEntry
                           key={entry.bestName}
                           entry={entry}
                           type={type}
                           placement={index + 1}
                        />
                     ))
                  ) : (
                     <li className="flex flex-col items-center justify-center p-4 bg-transparent rounded-md text-white text-center">
                        <img
                           src="https://cdn.7tv.app/emote/60ae6a7b117ec68ca434404e/4x.webp"
                           alt="No Players Found"
                           className="w-32 h-32 mb-4 hover:animate-pulse"
                        />
                        <h3 className="text-xl font-semibold mb-2">😢 No players found.</h3>
                        <p className="text-gray-400">Try searching for a different name or check back later!</p>
                     </li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Leaderboard;
