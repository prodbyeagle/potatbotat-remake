// src/components/User/UserLoader.tsx

import React from 'react';

const UserLoader: React.FC = () => {
   return (
      <div className="flex items-center justify-center h-screen rounded-xl border border-neutral-600 backdrop-blur-lg bg-neutral-900/50">
         <div className="flex flex-col items-center">
            <img
               src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30d/512.webp"
               alt="Loading Emoji"
               className="w-16 h-16"
            />
            <p className="text-lg text-white mt-4">Loading userdata...</p>
         </div>
      </div>
   );
};

export default UserLoader;
