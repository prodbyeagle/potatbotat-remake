import React, { useEffect, useState } from 'react';
import { StatsData } from '../types/Stats';

const Stats: React.FC = () => {
   const [stats, setStats] = useState<StatsData | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchStats = async () => {
         try {
            const response = await fetch('https://api.potat.app/');
            if (!response.ok) {
               throw new Error('Failed to fetch stats');
            }
            const data = await response.json();
            setStats(data.data[0]);
            setLoading(false);
         } catch (error) {
            console.error('Error fetching stats:', error);
            setLoading(false);
         }
      };

      const socket = new WebSocket('wss://stats.potat.app');

      socket.onopen = () => {
         console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
         console.log('Raw WebSocket data received:', event.data);

         try {
            //? this can be coded better it works so...
            const newStats = JSON.parse(event.data);
            if (newStats && newStats.data) {
               switch (newStats.topic) {
                  case 'stats/commands-executed':
                     setStats(prevStats => {
                        const currentStats = prevStats ?? {
                           misc: { commandsUsed: 0, emotesAdded: 0 },
                           twitch: { activeChannels: 0 },
                           potato: { total: 0, updateCount: 0 }
                        };

                        return {
                           ...currentStats,
                           misc: {
                              ...currentStats.misc,
                              commandsUsed: newStats.data.totalCount,
                           },
                        };
                     });
                     break;

                  case 'stats/potato-update':
                     console.log('Potato update data:', newStats.data);
                     setStats(prevStats => {
                        const currentStats = prevStats ?? {
                           misc: { commandsUsed: 0, emotesAdded: 0 },
                           twitch: { activeChannels: 0 },
                           potato: { total: 0, updateCount: 0 }
                        };

                        return {
                           ...currentStats,
                           potato: {
                              ...currentStats.potato,
                              total: newStats.data.totalCount,
                              updateCount: newStats.data.updateCount ?? currentStats.potato.updateCount
                           }
                        };
                     });
                     break;

                  default:
                     console.warn('Unhandled topic:', newStats.topic, newStats.data);
               }
            } else {
               console.warn('Unexpected data format:', newStats);
            }
         } catch (error) {
            console.error('Error parsing WebSocket data:', error);
         }
      };

      socket.onerror = (error) => {
         console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
         console.log('WebSocket closed');
      };

      fetchStats();

      return () => {
         socket.close();
      };
   }, []);

   if (loading) {
      return <p className="text-gray-300">Loading stats...</p>;
   }

   if (!stats) {
      return <p className="text-gray-300">No stats available.</p>;
   }

   const {
      misc: { commandsUsed } = { commandsUsed: 0},
      potato: { total = 0 } = { total: 0 },
   } = stats;

   return (
      <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-xl shadow-md p-4 mt-6">
         <h2 className="text-lg font-bold text-white mb-2">Bot Stats</h2>
         <div className="text-gray-400 mb-1">
            <span className="font-semibold">Commands executed:</span> {commandsUsed.toLocaleString()}
         </div>
         <div className="text-gray-400 mb-1">
            <span className="font-semibold">Potatoes farmed:</span> {total.toLocaleString()}
         </div>
      </div>
   );
};

export default Stats;
