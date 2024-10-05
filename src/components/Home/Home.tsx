import React, { useEffect, useState } from 'react';
import PartnerCard from './PartnerCard';
import PaintSelector from './PaintSelector';
import { Partner } from '../../types/Home';
import { Paint } from '../../types/Paint';
import Stats from '../Stats';

const Home: React.FC = () => {
   const [partner, setPartner] = useState<Partner | null>(null);
   const [partners, setPartners] = useState<Partner[]>([]);
   const [animationClass, setAnimationClass] = useState<string>('');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedPaint, setSelectedPaint] = useState<Paint>({
      gradient: 'radial-gradient(circle, #ffe5b8 10%, #fff 25%, #fe8b8b 35%, #fe9fc8 50%, #ff388e 75%, #ff006f 100%)',
      name: 'erm @prodbyeagle',
      shadow: 'drop-shadow(#ff007b 0px 0px 0.1px) drop-shadow(#ff007b 0px 0px 4px)',
   });
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const savedPaint = localStorage.getItem('selectedPaint');
      if (savedPaint) {
         try {
            const paintData = JSON.parse(savedPaint);
            setSelectedPaint(paintData);
         } catch (error) {
            console.error('Error parsing saved paint:', error);
         }
      }
   }, []);

   useEffect(() => {
      const fetchPartners = async () => {
         try {
            const response = await fetch('https://api.potat.app/partners');
            const data = await response.json();
            setPartners(data.data);
            setPartner(data.data[0]);
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

   const handlePaintSelect = (paint: Paint) => {
      setSelectedPaint(paint);
      localStorage.setItem('selectedPaint', JSON.stringify(paint));
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
                     backgroundImage: selectedPaint.url ? `url(${selectedPaint.url})` : selectedPaint.gradient,
                     filter: selectedPaint.shadow,
                     WebkitBackgroundClip: 'text',
                     backgroundClip: 'text',
                     color: 'transparent',
                     backgroundSize: '100% auto',
                     display: 'inline-block',
                  }}>
                  PotatBotat
               </h1>
            </div>

            <p className="text-lg text-white text-center my-6">
               A versatile chatbot for emotes, entertainment, and utilities.
            </p>
            <p className="text-xl text-yellow-400 text-center">
               ⚠️ This website is currently in development. Expect some bugs.
            </p>
            <p className="text-sm text-white/60 text-center">
               Tip: Click the logo next to "PotatBotat" to change the paint theme.
            </p>

            <h2 className="text-2xl text-white font-semibold mt-6">Featured Partners using this Bot:</h2>
            {loading ? (
               <p className="text-lg text-white">Loading partners...</p>
            ) : partner ? (
               <PartnerCard partner={partner} animationClass={animationClass} />
            ) : (
               <p className="text-lg text-white">No partners available.</p>
            )}

            <Stats />
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
