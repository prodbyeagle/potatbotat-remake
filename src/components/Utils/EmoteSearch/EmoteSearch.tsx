import React, { useState } from 'react';
import EmoteLoader from './EmoteLoader';

interface Emote {
   id: string;
   name: string;
   format: string;
   url: string;
}

const EmoteSearch: React.FC = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [searchType, setSearchType] = useState('starts');
   const [formatFilter, setFormatFilter] = useState('all');
   const [caseSensitive, setCaseSensitive] = useState(false);
   const [emotes, setEmotes] = useState<Emote[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchEmotes = async () => {
      setLoading(true);
      setError(null);

      const url = `https://api.potat.app/twitch/emotes/search?${searchType}=${searchTerm}&case=${caseSensitive}&first=100`;

      try {
         const response = await fetch(url);
         const data = await response.json();

         if (formatFilter !== 'all') {
            setEmotes(data.data.filter((emote: Emote) => emote.format.toLowerCase() === formatFilter));
         } else {
            setEmotes(data.data);
         }
      } catch (err) {
         setError('Failed to fetch emotes');
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return <EmoteLoader />;
   }

   return (
      <div className="flex flex-col lg:flex-row lg:h-screen duration-100 transition-all bg-neutral-700/40 p-2 border border-neutral-600 backdrop-blur-lg rounded-xl text-white relative z-10">
         <aside className="w-full lg:w-1/6 bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 lg:h-auto mb-2 lg:mb-0">
            <h2 className="text-lg font-bold text-white mb-2">Search Options</h2>
            <ul>
               <li className="mb-2">
                  <input
                     type="text"
                     placeholder="Search emotes..."
                     className="p-2 rounded-lg bg-neutral-700/40 border border-neutral-600 text-white placeholder-gray-400 focus:outline-none h-15 w-full"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </li>
               <li className="mb-2">
                  <select
                     value={searchType}
                     onChange={(e) => setSearchType(e.target.value)}
                     className="p-2 rounded-lg bg-neutral-700/40 border border-neutral-600 text-white h-15 w-full"
                  >
                     <option value="matches">Matches</option>
                     <option value="starts">Starts with</option>
                     <option value="includes">Includes</option>
                     <option value="ends">Ends with</option>
                  </select>
               </li>
               <li className="mb-2">
                  <select
                     value={formatFilter}
                     onChange={(e) => setFormatFilter(e.target.value)}
                     className="p-2 rounded-lg bg-neutral-700/40 border border-neutral-600 h-15 text-white w-full"
                  >
                     <option value="all">All</option>
                     <option value="static">Static</option>
                     <option value="animated">Animated</option>
                  </select>
               </li>
               <li>
                  <label className="flex items-center text-white cursor-pointer relative group">
                     <input
                        type="checkbox"
                        checked={caseSensitive}
                        onChange={() => setCaseSensitive(!caseSensitive)}
                        className="absolute opacity-0 cursor-pointer"
                     />
                     <span className="h-5 w-5 border border-neutral-600 rounded-md bg-neutral-700 flex items-center justify-center transition duration-200 ease-in-out group-hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        {caseSensitive && (
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-check w-3 h-3 text-green-600"
                           >
                              <path d="M20 6 9 17l-5-5" />
                           </svg>
                        )}
                     </span>
                     <span className="select-none ml-2">Case Sensitive</span>
                  </label>
               </li>
            </ul>
            <button
               onClick={fetchEmotes}
               disabled={!searchTerm}
               className={`bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 text-white font-bold py-2 px-4 rounded-lg transition-all mt-2 w-full ${!searchTerm ? 'opacity-50 cursor-default' : 'hover:bg-neutral-700/50 hover:rounded-xl'
                  }`}
            >
               Search
            </button>
         </aside>

         <div className="flex-1 ml-0 md:ml-2">
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 gap-2 h-[calc(100vh-33px)] overflow-y-auto ">
               {emotes.map((emote) => (
                  <div
                     key={emote.id}
                     className="flex flex-col items-center bg-neutral-800/50 p-4 rounded-lg border border-neutral-600"
                  >
                     <img src={emote.url} alt={emote.name} className="w-20 h-20 mb-2" />
                     <p className="text-white">{emote.name}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default EmoteSearch;
