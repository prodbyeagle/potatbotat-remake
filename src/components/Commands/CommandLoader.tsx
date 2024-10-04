// src/components/Commands/CommandLoader.tsx

import React from 'react';

const CommandLoader: React.FC = () => {
   return (
      <div className="flex items-center justify-center h-screen bg-neutral-900/50 backdrop-blur-md">
         <div className="flex flex-col items-center">
            <img
               src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30d/512.webp"
               alt="Loading Emoji"
               className="w-16 h-16"
            />
            <p className="text-lg text-white mt-4">Loading commands...</p>
         </div>
      </div>
   );
};

export default CommandLoader;
