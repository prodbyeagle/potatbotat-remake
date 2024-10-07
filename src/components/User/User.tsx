import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserLoader from './UserLoader';
import { UserData } from '../../types/User';

const User: React.FC = () => {
   const { username } = useParams<{ username: string }>();
   const [userData, setUserData] = useState<UserData | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchUserData = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await fetch(`https://api.potat.app/users/${username}`);
            if (!response.ok) {
               const errorData = await response.json();
               if (errorData?.data?.[0]?.errors?.message === 'User not found') {
                  setError('User not found');
               } else {
                  setError('An error occurred while fetching data.');
               }
               return;
            }
            const data = await response.json();

            if (data.data && data.data.length > 0 && data.data[0].user) {
               setUserData(data.data[0]);
            } else {
               setError('No user data found.');
            }
         } catch (err) {
            console.error(err);
            setError('An error occurred while fetching data.');
         } finally {
            setLoading(false);
         }
      };

      fetchUserData();
   }, [username]);

   if (loading) {
      return <UserLoader />;
   }

   if (error || !userData) {
      return (
         <div className="flex flex-col items-center justify-center p-4 bg-neutral-800/50 backdrop-blur-lg border border-neutral-600 rounded-lg text-white">
            <img
               src="https://cdn.7tv.app/emote/60ae6a7b117ec68ca434404e/4x.webp"
               alt="No Players Found"
               className="w-32 h-32 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">😢 {error === 'User not found' ? "This user doesn't exist." : 'No players found.'}</h3>
            <p className="text-gray-400">
               {error === 'User not found' ? 'Try searching for a different name or check back later!' : 'An error occurred while fetching user data.'}
            </p>
         </div>
      );
   }

   const potatoes = userData.potatoes || { count: 0, rank: 0 };

   return (
      <div className="bg-neutral-700/40 p-2 rounded-xl border border-neutral-600 backdrop-blur-lg text-white">
         <div className="flex flex-col sm:flex-row rounded-lg items-center mb-2 p-2 border border-neutral-600 bg-neutral-800/40 backdrop-blur-lg">
            {userData?.user.connections.map((connection) => {
               if (connection.platform === 'TWITCH' && connection.pfp) {
                  return (
                     <img
                        key={connection.id}
                        src={connection.pfp}
                        alt={`${userData.user.display}'s profile`}
                        className="w-14 h-14 rounded-full mr-2"
                     />
                  );
               }
               return null;
            })}
            <h1 className="text-4xl font-bold text-center sm:text-left mt-2 sm:mt-0">@{userData.user.display}</h1>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-neutral-800/50 p-4 rounded-lg shadow-lg border border-neutral-600">
               <p>Level: <span className="font-semibold">{userData.user.level}</span></p>
               <p>First Seen: <span className="font-semibold">{new Date(userData.user.first_seen).toLocaleDateString()}</span></p>
               <p>Is Bot: <span className="font-semibold">{userData.user.settings.is_bot ? 'Yes' : 'No'}</span></p>
               <p>Language: <span className="font-semibold">{userData.user.settings.language || 'N/A'}</span></p>
               <p>No Reply: <span className="font-semibold">{userData.user.settings.no_reply ? 'Yes' : 'No'}</span></p>
               <p>Joined: <span className="font-semibold">{userData.channel ? new Date(userData.channel.joinedAt).toLocaleDateString() : 'N/A'}</span></p>
            </div>

            <div className="bg-neutral-800/50 p-4 rounded-lg shadow-lg border border-neutral-600">
               <h2 className="text-2xl font-semibold mb-2">Connections:</h2>
               <ul className="space-y-2">
                  {userData.user.connections.map((connection, index) => (
                     <li key={index} className="flex items-center space-x-2">
                        <span className="font-semibold">{connection.platform}:</span>
                        <span>{connection.display || connection.username || ''}</span>
                     </li>
                  ))}
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className="bg-neutral-800/50 p-4 rounded-lg shadow-lg border border-neutral-600">
               <h2 className="text-2xl font-semibold mb-2">Potato Stats:</h2>
               <p>Total Potatoes: <span className="font-semibold">{potatoes.count}</span></p>
               <p>Rank: <span className="font-semibold">{potatoes.rank}</span></p>
               <p>Prestige: <span className="font-semibold">{userData.potatoes?.prestige || 'N/A'}</span></p>
               <p>Tax Multiplier: <span className="font-semibold">{userData.potatoes?.taxMultiplier || 'N/A'}</span></p>
            </div>

            <div className="bg-neutral-800/50 p-4 rounded-lg shadow-lg border border-neutral-600">
               <h2 className="text-2xl font-semibold mb-2">Actions:</h2>
               <h3>Trample: <span className="font-semibold">{userData.potatoes?.trample?.ready ? 'Ready' : 'Not Ready'}</span></h3>
               <h3>Gamble Wins: <span className="font-semibold">{userData.potatoes?.gamble?.totalWins || 0}</span></h3>
               <h3>Gamble Losses: <span className="font-semibold">{userData.potatoes?.gamble?.totalLosses || 0}</span></h3>
               <h3>Duel Wins: <span className="font-semibold">{userData.potatoes?.duel?.totalWins || 0}</span></h3>
               <h3>Duel Losses: <span className="font-semibold">{userData.potatoes?.duel?.totalLosses || 0}</span></h3>
            </div>
         </div>
      </div>
   );
};

export default User;
