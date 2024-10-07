import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerCard from './PartnerCard';
import PaintSelector from './PaintSelector';
import Tooltip from '../Tooltip';
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
   const [searchTerm, setSearchTerm] = useState<string>('');
   const navigate = useNavigate();

   const isMobile = window.matchMedia("(max-width: 768px)").matches;

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

   const handleSearch = () => {
      if (searchTerm.trim()) {
         navigate(`/u/${searchTerm.trim()}`);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center h-full bg-neutral-800/50 border border-neutral-600 rounded-xl backdrop-blur-md p-4 sm:p-10">
         <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-xl p-6 sm:p-10 my-10 shadow-lg flex flex-col items-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
               <Tooltip content='Click to change the Paint' position='top'>
                  <img
                     src="https://potat.app/tatoExplode.gif"
                     alt="PotatBotat Logo"
                     className="w-16 h-auto rounded-xl p-2 cursor-pointer duration-100 transition-all hover:scale-105 hover:bg-neutral-700/50"
                     onClick={() => !isMobile && setIsModalOpen(true)}
                  />
               </Tooltip>
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

            <p className="text-lg text-white text-center mb-6">
               A versatile chatbot for emotes, entertainment, and utilities.
            </p>

            {isMobile && (
               <p className="text-lg text-red-500 mb-4">Paint selection is currently not available on mobile devices.</p>
            )}

            <div className="flex space-x-2 mb-6">
               <input
                  type="text"
                  placeholder="RyanPotat"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                        handleSearch();
                     }
                  }}
                  className="p-2 rounded-lg bg-neutral-700 border h-10 border-neutral-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
               />
               <button
                  onClick={handleSearch}
                  className="bg-neutral-800/50 hover:bg-neutral-700/50 backdrop-blur-xl h-10 border border-neutral-600 text-white font-bold py-2 px-4 rounded-lg hover:rounded-xl transition-all"
               >
                  Go!
               </button>
            </div>

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

         {!isMobile && (
            <PaintSelector
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               onSelect={handlePaintSelect}
            />
         )}
      </div>
   );
};

export default Home;
