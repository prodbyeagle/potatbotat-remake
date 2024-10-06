// src/components/Leaderboard/LeaderboardCategory.tsx

import React from 'react';
import { LeaderboardType } from '../../types/Leaderboard';
import { leaderboardCategories } from '../../constants/Leaderboard';

interface LeaderboardCategoryProps {
   type: LeaderboardType;
   setType: React.Dispatch<React.SetStateAction<LeaderboardType>>;
}

const LeaderboardCategory: React.FC<LeaderboardCategoryProps> = ({ type, setType }) => {
   const categories = Object.keys(leaderboardCategories) as LeaderboardType[];

   return (
      <aside className="w-full lg:w-1/6 bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 h-fit mb-4 lg:mb-0">
         <h2 className="text-lg font-bold text-white mb-2">Categories</h2>
         <ul>
            {categories.map(category => (
               <li key={category}>
                  <button
                     onClick={() => setType(category)}
                     className={`block w-full mb-1 text-left p-2 rounded-md duration-100 transition-all hover:bg-neutral-600/50 text-white ${type === category ? 'bg-neutral-600' : ''}`}>
                     {leaderboardCategories[category]}
                  </button>
               </li>
            ))}
         </ul>
      </aside>
   );
};

export default LeaderboardCategory;
