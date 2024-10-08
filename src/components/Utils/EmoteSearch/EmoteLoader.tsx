// src/components/EmoteSearch/EmoteLoader.tsx

import React from 'react';

const EmoteLoader: React.FC = () => {
   return (
      <div className="flex items-center justify-center h-screen bg-transparent">
         <div className="flex flex-col items-center">
            <img
               src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30d/512.webp"
               alt="Loading Emoji"
               className="w-16 h-16"
            />
            <p className="text-lg text-white mt-4">Loading emotes...</p>
         </div>
      </div>
   );
};

export default EmoteLoader;
