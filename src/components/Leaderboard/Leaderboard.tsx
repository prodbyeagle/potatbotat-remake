// src/components/Leaderboard/Leaderboard.tsx

import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import LeaderboardEntry from './LeaderboardEntry';
import LeaderboardCategory from './LeaderboardCategory';
import { LeaderboardEntry as LeaderboardEntryType, LeaderboardType } from '../../types/Leaderboard'; // Import types

const Leaderboard: React.FC = () => {
   const [leaderboard, setLeaderboard] = useState<LeaderboardEntryType[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [type, setType] = useState<LeaderboardType>('potatoes'); // Use LeaderboardType

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

   const categories: LeaderboardType[] = ['potatoes', 'trivia', 'scramble', 'paints', 'badges', 'emoteschannel', 'emotesuser'];

   return (
      <div className="flex flex-col lg:flex-row h-screen bg-neutral-700/40 p-2 backdrop-blur-lg rounded-xl text-white z-auto">
         <LeaderboardCategory categories={categories} type={type} setType={setType} />
         <div className="flex-1">
            <div className="sticky top-0 rounded-md z-auto mb-2">
               <input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 rounded-md bg-transparent border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-3 md:ml-2"
               />
            </div>
            <div className="bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 shadow-lg h-[calc(100vh-60px)] overflow-y-auto ml-3 md:ml-2">
               <h2 className="text-2xl font-bold text-white mb-4">Leaderboard</h2>
               <ul className="space-y-4">
                  {filteredLeaderboard.length > 0 ? (
                     filteredLeaderboard.map((entry) => (
                        <LeaderboardEntry key={entry.bestName} entry={entry} type={type} />
                     ))
                  ) : (
                     <li className="p-4 bg-neutral-800 rounded-md text-white">No players found.</li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Leaderboard;
