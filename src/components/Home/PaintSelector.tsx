import React, { useState } from 'react';
import { Paint, PaintSelectorProps } from '../../types/Paint';
import paintsData from '../../paints.json';
import Tooltip from '../Tooltip';

const PaintSelector: React.FC<PaintSelectorProps> = ({ onSelect, onClose }) => {
   const [hoveredPaintIndex, setHoveredPaintIndex] = useState<number | null>(null);
   const paints = paintsData;

   const handlePaintSelect = (paint: Paint) => {
      onSelect(paint);
      onClose();
   };

   return (
      <>
         <h2 className="text-3xl font-bold text-center text-white mb-6">Choose a Paint</h2>
         <h2 className="text-sm font-normal italic text-center text-gray-400 mb-6">Something Wrong? Report it.</h2>
         <div className="transition duration-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-2">
            {paints.map((paint, index) => (
               <Tooltip
                  key={index}
                  content={paint.description ? paint.description : "No description available"}
                  position='top'
               >
                  <div
                     className={`relative cursor-pointer rounded-xl transition-all duration-200 hover:scale-105 bg-neutral-800 overflow-hidden`}
                     onClick={() => handlePaintSelect(paint)}
                     onMouseEnter={() => setHoveredPaintIndex(index)}
                     onMouseLeave={() => setHoveredPaintIndex(null)}
                     style={{
                        backgroundImage: paint.gradient ? paint.gradient : undefined,
                        height: '150px',
                     }}
                  >
                     {paint.url && (
                        <img
                           src={paint.url}
                           alt={paint.name}
                           className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-300"
                           style={{
                              filter: paint.shadow,
                              animationPlayState: hoveredPaintIndex === index ? 'running' : 'paused',
                           }}
                           loading='lazy'
                        />
                     )}
                     <div className="absolute bottom-0 left-0 right-0 bg-neutral-600/60 backdrop-blur-lg text-white text-sm text-center p-2 truncate z-10">
                        {paint.name}
                     </div>
                  </div>
               </Tooltip>
            ))}
         </div>
      </>
   );
};

export default PaintSelector;
