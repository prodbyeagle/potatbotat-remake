import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
   return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-center">
         <img
            src="https://cdn.7tv.app/emote/60ae6a7b117ec68ca434404e/4x.webp"
            alt="Not Found"
            className="w-24 h-24 mb-4"
         />
         <h1 className="text-6xl font-bold mb-4">404</h1>
         <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
         <Link to="/" className="bg-neutral-600/50 hover:bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 text-white font-bold py-2 px-4 rounded-lg hover:rounded-xl transition-all">
            Go Back to Home
         </Link>
      </div>
   );
};

export default NotFound;
