import React, { useEffect, useState } from 'react';
import { StatsData } from '../types/Stats';

const Stats: React.FC = () => {
   const [stats, setStats] = useState<StatsData | null>(null);
   const [loading, setLoading] = useState(true);
   const [socket, setSocket] = useState<WebSocket | null>(null);

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

      const connectWebSocket = () => {
         const newSocket = new WebSocket('wss://stats.potat.app');

         newSocket.onmessage = (event) => {

            try {
               const newStats = JSON.parse(event.data);
               if (newStats && newStats.data) {
                  const update = newStats.data;
                  const topic = newStats.topic;
                  processStatsUpdate(topic, update);
               } else {
                  console.warn('Unexpected data format:', newStats);
               }
            } catch (error) {
               console.warn('Non-JSON message received:', event.data);
            }
         };

         newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
         };

         newSocket.onclose = () => {
            setTimeout(connectWebSocket, 3000);
         };

         setSocket(newSocket);
      };

      fetchStats();
      connectWebSocket();

      return () => {
         socket?.close();
      };
      //eslint-disable-next-line
   }, []);

   const processStatsUpdate = (topic: string, update: any) => {
      setStats(prevStats => {
         const currentStats = prevStats ?? {
            misc: { commandsUsed: 0, emotesAdded: 0 },
            twitch: { activeChannels: 0, usersSeen: 0 },
            potato: { total: 0, updateCount: 0 },
         };

         switch (topic) {
            case 'stats/commands-executed':
               currentStats.misc.commandsUsed = update.totalCount;
               break;
            case 'stats/new-user':
               currentStats.twitch.usersSeen += 1;
               break;
            case 'stats/active-channels':
               currentStats.twitch.activeChannels = update.activeCount;
               break;
            case 'stats/emote-actions':
               if (update.action === 'ADD') {
                  currentStats.misc.emotesAdded += 1;
               }
               break;
            case 'stats/potato-update':
               const updateCount = update.updateCount;
               const promises: Promise<void>[] = [];
               for (let i = 0; i < updateCount; i++) {
                  promises.push(
                     new Promise(resolve => {
                        currentStats.potato.total += 1;
                        setTimeout(resolve, Math.min(15, 5000 / updateCount));
                     })
                  );
               }

               Promise.all(promises).then(() => {
                  setStats(currentStats);
               });
               return currentStats;
            default:
               console.warn('Unhandled topic:', topic, update);
         }

         return { ...currentStats };
      });
   };

   if (loading) {
      return <p className="text-gray-300">Loading stats...</p>;
   }

   if (!stats) {
      return <p className="text-gray-300">No stats available.</p>;
   }

   const {
      misc: { commandsUsed, emotesAdded } = { commandsUsed: 0, emotesAdded: 0 },
      twitch: { activeChannels, usersSeen } = { activeChannels: 0, usersSeen: 0 },
      potato: { total = 0 } = { total: 0 },
   } = stats;

   return (
      <div className="bg-transparent backdrop-blur-xl border transition-all duration-100 border-neutral-600 rounded-xl shadow-md p-4 mt-6">
         <h2 className="text-lg text-center font-bold text-white mb-2">Some Bot Stats:</h2>
         <div className="text-gray-400 mb-1">
            <span className="font-semibold">Commands executed:</span> {commandsUsed.toLocaleString()}
         </div>
         <div className="text-gray-400 mb-1">
            <span className="font-semibold">Emotes added:</span> {emotesAdded.toLocaleString()}
         </div>
         <div className="text-gray-400 mb-1">
            <span className="font-semibold">Active channels:</span> {activeChannels.toLocaleString()}
         </div>
         <div className="text-gray-400 mb-1">
            <span className="font-semibold">Users seen:</span> {usersSeen.toLocaleString()}
         </div>
         <div className="text-gray-400 mb-1">
            <span className="font-semibold">Potatoes farmed:</span> {total.toLocaleString()}
         </div>
      </div>
   );
};

export default Stats;
