import React from 'react';

const Home: React.FC = () => {
   return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 bg-opacity-90 backdrop-blur-md relative overflow-hidden">
         <div className="bg-neutral-800/80 backdrop-blur-xl border border-neutral-400 rounded-lg p-10 shadow-lg relative z-10">
            <h1 className="text-5xl font-bold text-white text-center">PotatBotat</h1>
            <img
               src="https://potat.app/tatoExplode.gif"
               alt="PotatBotat Logo"
               className="my-6 w-32 h-auto rounded-md shadow-lg"
            />
            <p className="text-lg text-white text-center">
               An emote, entertainment, and utility chatbot
            </p>
         </div>
      </div>
   );
};

export default Home;
