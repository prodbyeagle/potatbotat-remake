import React, { useEffect, useState } from 'react';

interface Partner {
   id: string;
   followers: number;
   command_count: number;
   joined_at: string;
   page_url: string;
   user_color: string | null;
   display: string;
   twitch_pfp: string;
   username: string;
}

const Home: React.FC = () => {
   const [partner, setPartner] = useState<Partner | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [partners, setPartners] = useState<Partner[]>([]);
   const [animationClass, setAnimationClass] = useState<string>('');

   // Fetch partners data
   useEffect(() => {
      const fetchPartners = async () => {
         try {
            const response = await fetch('https://api.potat.app/partners');
            const data = await response.json();
            setPartners(data.data);
            setPartner(data.data[0]);
            setLoading(false);
         } catch (error) {
            console.error('Error fetching partners:', error);
            setLoading(false);
         }
      };

      fetchPartners();
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         if (partners.length > 0) {
            const randomIndex = Math.floor(Math.random() * partners.length);
            setAnimationClass('fade-out');
            setTimeout(() => {
               setPartner(partners[randomIndex]);
               setAnimationClass('fade-in');
            }, 300);
         }
      }, 3000);

      return () => clearInterval(interval);
   }, [partners]);

   const formatJoinedAt = (joinedAt: string) => {
      const joinedDate = new Date(joinedAt);
      const now = new Date();
      const monthsDiff = now.getMonth() - joinedDate.getMonth() + (12 * (now.getFullYear() - joinedDate.getFullYear()));
      const daysDiff = now.getDate() - joinedDate.getDate();

      const daysCount = daysDiff < 0 ? new Date(now.getFullYear(), now.getMonth(), 0).getDate() + daysDiff : daysDiff;

      return `Joined ${monthsDiff} Months and ${daysCount} days ago`;
   };

   if (loading) {
      return <div className="text-white">Loading partners...</div>;
   }

   return (
      <div className="flex flex-col items-center justify-center border border-neutral-600 h-screen bg-neutral-900/50 backdrop-blur-md relative overflow-hidden rounded-xl">
         <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-10 shadow-lg relative z-10 flex flex-col items-center">
            <div className="flex justify-start">
               <img
                  src="https://potat.app/tatoExplode.gif"
                  alt="PotatBotat Logo"
                  className="w-16 h-auto rounded-md shadow-lg"
               />
               <h1 className="text-5xl font-bold mr-4"
                  style={{
                     backgroundImage: 'url(https://cdn.7tv.app/emote/667c887f387822a16b8f57ed/3x.webp)',
                     filter: 'drop-shadow(#9d31a5 0px 0px .1px)',
                     WebkitBackgroundClip: 'text',
                     backgroundClip: 'text',
                     color: 'transparent',
                     backgroundSize: '100% auto',
                  }}>
                  PotatBotat
               </h1>
            </div>
            <p className="text-lg text-white text-center my-6">
               An emote, entertainment, and utility chatbot
            </p>

            {partner && (
               <div className={`mt-8 p-4 bg-neutral-700 rounded-lg flex items-center space-x-4 transition-all duration-300 ${animationClass}`}>
                  <img
                     src={partner.twitch_pfp}
                     alt={`${partner.display}'s profile`}
                     className="w-24 h-24 rounded-full"
                  />
                  <div>
                     <h2 className="text-xl font-bold" style={{ color: partner.user_color || 'white' }}>
                        @{partner.display}
                     </h2>
                     <p className="text-gray-300">Followers: {partner.followers.toLocaleString()}</p>
                     <p className="text-gray-300">Commands: {partner.command_count}</p>
                     <p className="text-gray-300">{formatJoinedAt(partner.joined_at)}</p>
                     <a href={partner.page_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Visit Profile
                     </a>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Home;
