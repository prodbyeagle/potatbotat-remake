import React from 'react';

const ApiDocs: React.FC = () => {
   return (
      <div className="flex items-center justify-center h-screen rounded-xl border border-neutral-600 backdrop-blur-lg bg-neutral-900/50 p-4">
         <div className="flex flex-col items-center text-center">
            <img
               src="https://cdn.7tv.app/emote/62f9cabd00630d5b2acd66f0/4x.webp"
               alt="Loading Emoji"
               className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-2xl shadow-neutral-500"
            />
            <p className="text-2xl sm:text-4xl lg:text-5xl font-medium text-white mt-4">This Page is getting an Update.</p>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-400 mt-2">
               In the meantime, use the current docs page:
               <a href="https://potat.app/api/docs" className="text-blue-400 hover:underline ml-1">
                  https://potat.app/api/docs
               </a>
            </p>
         </div>
      </div>
   );
};

export default ApiDocs;
