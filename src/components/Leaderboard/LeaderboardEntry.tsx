// src/components/Leaderboard/LeaderboardEntry.tsx

import React from 'react';
import { LeaderboardEntryProps } from '../../types/Leaderboard';


const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ entry, type }) => {
   const renderStat = () => {
      switch (type) {
         case 'potatoes':
            return <p className="text-gray-400">Potato Count: {entry.potatoCount?.toLocaleString()}</p>;
         case 'emoteschannel':
         case 'emotesuser':
            return <p className="text-gray-400">Emote Count: {entry.emote_count?.toLocaleString()}</p>;
         case 'trivia':
            return <p className="text-gray-400">Trivia Wins: {entry.trivia_wins?.toLocaleString()}</p>;
         case 'scramble':
            return <p className="text-gray-400">Scramble Wins: {entry.scramble_wins?.toLocaleString()}</p>;
         case 'paints':
            return <p className="text-gray-400">Paint Count: {entry.paint_count?.toLocaleString()}</p>;
         case 'badges':
            return <p className="text-gray-400">Badge Count: {entry.badge_count?.toLocaleString()}</p>;
         default:
            return null;
      }
   };

   return (
      <li className="p-4 bg-neutral-800/60 rounded-md shadow-md">
         <h3 className="text-lg font-semibold text-white">{entry.bestName}</h3>
         {renderStat()}
         {entry.farmName && (
            <p className="text-gray-300">Farm: {entry.farmName} (Size: {entry.farmSize})</p>
         )}
         {entry.prestige && <p className="text-gray-400">Prestige: {entry.prestige}</p>}
         <img src={entry.user_pfp} alt={entry.bestName} className="w-12 h-12 rounded-full mt-2" />
      </li>
   );
};

export default LeaderboardEntry;
