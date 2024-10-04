// src/components/Home/Home.tsx

import React, { useEffect, useState } from 'react';
import PartnerCard from './PartnerCard';
import PaintSelector from './PaintSelector';
import { Partner } from '../../types/Home';

const Home: React.FC = () => {
   const [partner, setPartner] = useState<Partner | null>(null);
   const [partners, setPartners] = useState<Partner[]>([]);
   const [animationClass, setAnimationClass] = useState<string>('');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedPaint, setSelectedPaint] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchPartners = async () => {
         try {
            const response = await fetch('https://api.potat.app/partners');
            const data = await response.json();
            setPartners(data.data);
            setPartner(data.data[0]);
            setSelectedPaint('https://cdn.7tv.app/emote/667c887f387822a16b8f57ed/4x.webp');
         } catch (error) {
            console.error('Error fetching partners:', error);
         } finally {
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
            }, 500);
         }
      }, 5000);

      return () => clearInterval(interval);
   }, [partners]);

   const handlePaintSelect = (paintUrl: string) => {
      setSelectedPaint(paintUrl);
      setIsModalOpen(false);
   };

   return (
      <div className="flex flex-col items-center justify-center border border-neutral-600 h-full bg-neutral-900/50 backdrop-blur-md relative overflow-hidden rounded-xl p-4 sm:p-10">
         <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-xl p-6 sm:p-10 my-10 shadow-lg relative z-auto flex flex-col items-center">
            <div className="flex items-center justify-center space-x-4">
               <img
                  src="https://potat.app/tatoExplode.gif"
                  alt="PotatBotat Logo"
                  className="w-16 h-auto rounded-xl p-2 cursor-pointer duration-100 transition-all hover:scale-105 hover:bg-neutral-600/60"
                  onClick={() => setIsModalOpen(true)}
                  title='Click to Change the Paint.'
               />
               <h1 className="text-4xl sm:text-5xl font-bold"
                  style={{
                     backgroundImage: `url(${selectedPaint})`,
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
            <p className="text-xl text-white text-center">
               ⚠️: This Website is still INDEV
            </p>
            <p className="text-sm text-white/30 text-center">
               Click the Logo Next to "PotatBotat"
            </p>
            <h2 className="text-2xl text-white font-semibold mt-6">Featured Partners using this Bot:</h2>
            {loading ? (
               <p className="text-lg text-white">Loading partners...</p>
            ) : partner ? (
               <PartnerCard partner={partner} animationClass={animationClass} />
            ) : (
               <p className="text-lg text-white">No partners available.</p>
            )}
         </div>

         <PaintSelector
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelect={handlePaintSelect}
         />
      </div>
   );
};

export default Home;
