import React from 'react';
import { LeaderboardEntryProps } from '../../types/Leaderboard';

interface ExtendedLeaderboardEntryProps extends LeaderboardEntryProps {
   placement: number;
}

const LeaderboardEntry: React.FC<ExtendedLeaderboardEntryProps> = ({ entry, type, placement }) => {
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

   const getPlacementClass = () => {
      switch (placement) {
         case 1:
            return 'gold-text';
         case 2:
            return 'silver-text';
         case 3:
            return 'bronze-text';
         default:
            return '';
      }
   };

   return (
      <li className="p-4 bg-neutral-800/50 backdrop-blur-xl rounded-md shadow-md flex items-center space-x-4 border border-neutral-600">
         <div className={`w-8 text-center font-bold ${getPlacementClass()}`}>
            #{placement}
         </div>

         <img src={entry.user_pfp} alt={entry.bestName} className="w-12 h-12 rounded-full" />

         <div className="flex-1">
            <a
               href={`https://twitch.tv/${entry.bestName.toLowerCase()}`}
               target="_blank"
               rel="noopener noreferrer"
               style={{ color: placement <= 3 ? undefined : entry.user_color || '#FFFFFF' }}
               className={`text-lg font-medium ${placement <= 3 ? getPlacementClass() : ''} transition-all duration-300 hover:font-normal hover:text-xl hover:underline`}
            >
               {entry.bestName}
            </a>
            {renderStat()}
            {entry.farmName && (
               <p className="text-gray-300">Farm: {entry.farmName} (Size: {entry.farmSize})</p>
            )}
            {entry.prestige && <p className="text-gray-400">Prestige: {entry.prestige}</p>}
         </div>
      </li>
   );
};

export default LeaderboardEntry;
