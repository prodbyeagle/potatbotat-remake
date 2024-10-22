import React, { useState } from 'react';
import ModalContainer from '../../ModalContainer';
import { Emote } from '../../../types/Emote';
import EmoteLoader from './EmoteLoader';

const emoteCache: { [emoteCode: string]: any } = {};

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

      const url = `https://api.potat.app/twitch/emotes/search?${searchType}=${searchTerm}&case=${caseSensitive}&first=125`;

      try {
         const response = await fetch(url, {
            method: 'GET',
            headers: {
               'Cache-Control': 'no-cache',
            },
         });
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

   const fetchEmoteDetails = async (emoteCode: string) => {
      if (emoteCache[emoteCode]) {
         return emoteCache[emoteCode];
      }

      const url = `https://api.potat.app/twitch/emotes?name=${emoteCode}`;
      try {
         const response = await fetch(url);

         if (!response.ok) {
            console.error(`[ERROR] Failed to fetch emote details. Status: ${response.status} ${response.statusText}`);
            return null;
         }

         const data = await response.json();

         if (Array.isArray(data.data) && data.data.length > 0 && Array.isArray(data.data[0])) {
            const emoteDetails = data.data[0][0];
            if (emoteDetails) {
               emoteCache[emoteCode] = emoteDetails;
               // console.log(`[CACHE] Storing emote details for ${emoteCode}`);
               return emoteDetails;
            }
         }
      } catch (err) {
         console.error(`[ERROR] Exception occurred while fetching emote details for ${emoteCode}:`, err);
         setError(`Failed to fetch emote details due to an error`);
      }

      return null;
   };

   return (
      <ModalContainer>
         {(addModal) => (
            <div className="flex flex-col lg:flex-row lg:h-screen duration-100 transition-all bg-neutral-800/40 p-2 border border-neutral-600 backdrop-blur-lg rounded-xl text-white relative z-10">
               <aside className="w-full lg:w-1/6 bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 lg:h-auto mb-2 lg:mb-0">
                  <h2 className="text-lg font-bold text-white mb-2">Search Options</h2>
                  <ul>
                     <li className="mb-2">
                        <input
                           type="text"
                           placeholder="Search emotes..."
                           className="p-2 rounded-lg bg-neutral-800/40 border border-neutral-600 text-white placeholder-gray-400 focus:outline-none h-15 w-full"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </li>
                     <li className="mb-2">
                        <select
                           value={searchType}
                           onChange={(e) => setSearchType(e.target.value)}
                           className="p-2 rounded-lg bg-neutral-800/40 border border-neutral-600 text-white h-15 w-full"
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
                           className="p-2 rounded-lg bg-neutral-800/40 border border-neutral-600 text-white h-15 w-full"
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
                     className={`bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 text-white font-bold py-2 px-4 rounded-lg transition-all mt-2 w-full ${!searchTerm ? 'opacity-50 cursor-default' : 'hover:bg-neutral-700/50 hover:rounded-xl'}`}
                  >
                     Search
                  </button>
               </aside>

               <div className="flex-1 ml-0 md:ml-2">
                  {error && <p className="text-red-500">{error}</p>}

                  {loading ? (
                     <div className="flex justify-center items-center h-full">
                        <EmoteLoader />
                     </div>
                  ) : (
                     <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-2 h-[calc(100vh-33px)] overflow-y-auto">
                        {emotes.map((emote) => (
                           <div
                              key={emote.id}
                              className="flex flex-col items-center bg-neutral-800/50 p-4 rounded-lg border border-neutral-600 cursor-pointer"
                              onClick={async () => {
                                 const emoteDetails = await fetchEmoteDetails(emote.name);

                                 if (!emoteDetails) {
                                    addModal(
                                       <div className="flex flex-col items-center justify-center h-fit text-white text-center">
                                          <h2 className="text-xl text-red-500 font-bold">Failed to load emote details</h2>
                                          <p className="text-lg">Please click this emote again.</p>
                                       </div>
                                    );
                                    return;
                                 }

                                 addModal(
                                    <div className="flex flex-col items-center justify-center h-fit text-white text-center p-4">
                                       <img
                                          src={emoteDetails.emoteURL || "❌ no image"}
                                          alt={emoteDetails.emoteCode || "❌ no image"}
                                          className="w-32 h-32 mb-4"
                                       />
                                       <h2 className="text-xl font-bold mb-2">{emoteDetails.emoteCode || "❌"}</h2>

                                       <div className="grid grid-cols-2 gap-4 text-left">
                                          <div>
                                             <p className="text-sm text-neutral-400">Channel Name</p>
                                             <p className="text-lg">{emoteDetails.channelName || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Login</p>
                                             <p className="text-lg">{emoteDetails.channelLogin || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Prefix</p>
                                             <p className="text-lg">{emoteDetails.emotePrefix || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Suffix</p>
                                             <p className="text-lg">{emoteDetails.emoteSuffix || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Asset Type</p>
                                             <p className="text-lg">{emoteDetails.emoteAssetType || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">State</p>
                                             <p className="text-lg">{emoteDetails.emoteState || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Type</p>
                                             <p className="text-lg">{emoteDetails.emoteType || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Tier</p>
                                             <p className="text-lg">{emoteDetails.emoteTier || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Set ID</p>
                                             <p className="text-lg truncate">{emoteDetails.emoteSetID || "❌"}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-neutral-400">Source</p>
                                             <p className="text-lg">{emoteDetails.source || "❌"}</p>
                                          </div>
                                       </div>
                                    </div>
                                 );

                              }}
                           >
                              <img
                                 src={emote.url || ''}
                                 alt={emote.name}
                                 className="max-w-[64px] max-h-[64px] mb-2"
                              />
                              <span className="text-sm text-white text-center truncate">{emote.name}</span>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         )}
      </ModalContainer>
   );
};

export default EmoteSearch;
