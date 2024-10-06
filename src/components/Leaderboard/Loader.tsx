// src/components/Leaderboard/Loader.tsx

import React from 'react';

const Loader: React.FC = () => {
   return (
      <div className="flex items-center justify-center h-screen border border-neutral-600 rounded-xl bg-neutral-900/50 backdrop-blur-md">
         <div className="flex flex-col items-center">
            <img
               src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30d/512.webp"
               alt="Loading Emoji"
               className="w-16 h-16"
            />
            <p className="text-lg text-white mt-4">Loading leaderboard...</p>
         </div>
      </div>
   );
};

export default Loader;
