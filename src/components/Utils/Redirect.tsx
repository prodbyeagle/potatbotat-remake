import React, { useState } from 'react';
import Tooltip from '../Tooltip';

const Redirect: React.FC = () => {
   const [inputUrl, setInputUrl] = useState<string>('');
   const [shortenedUrl, setShortenedUrl] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputUrl(e.target.value);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setShortenedUrl('');

      try {
         const response = await fetch('https://api.potat.app/redirect', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: inputUrl }),
         });

         const data = await response.json();

         if (response.ok) {
            const fullUrl = data.data[0].url;
            const shortened = fullUrl.replace(/^https?:\/\//, ''); // Strip the protocol
            setShortenedUrl(shortened);
         } else {
            setError('Error shortening URL. Please try again.');
         }
      } catch (error) {
         setError('Error shortening URL. Please check your network.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center border border-neutral-600 h-full bg-neutral-900/50 backdrop-blur-md relative overflow-hidden rounded-xl p-4 sm:p-10">
         <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-xl p-2 sm:p-10 my-10 shadow-lg relative z-auto flex flex-col items-center">

            <Tooltip position='top' content="buh">
               <img
                  src="https://cdn.7tv.app/emote/63cec0c12ba67946677a463e/4x.webp"
                  alt="Buh"
                  className="w-80 h-32 mb-4 rounded-md cursor-help"
               />
            </Tooltip>

            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
               <input
                  type="text"
                  value={inputUrl}
                  onChange={handleInputChange}
                  placeholder="Enter URL to shorten..."
                  className="w-full p-2 rounded-md bg-transparent border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mx-2"
                  required
               />
               <button
                  type="submit"
                  className="bg-neutral-800/50 hover:bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 text-white font-bold py-2 px-4 rounded-xl hover:rounded-lg transition-all"
                  disabled={loading}
               >
                  {loading ? 'Shortening...' : 'Shorten URL'}
               </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {shortenedUrl && (
               <div className="mt-4">
                  <h3 className="text-xl text-white font-semibold">Shortened URL:</h3>
                  <a href={`https://${shortenedUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                     {shortenedUrl}
                  </a>
               </div>
            )}
         </div>
      </div>
   );
};

export default Redirect;
