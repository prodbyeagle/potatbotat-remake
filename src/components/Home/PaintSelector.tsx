import React from 'react';
import Modal from '../Modal';
import { PaintSelectorProps } from '../../types/Paint';

const paints = [
   {
      url: "https://cdn.7tv.app/emote/667c887f387822a16b8f57ed/4x.webp",
      shadow: "drop-shadow(rgb(165, 57, 254) 0px 0px 0.1px) drop-shadow(rgb(127, 17, 187) 1px 1px 0.1px)",
      name: "TwitchCon 2024 Rotterdam"
   },
   {
      url: "https://cdn.7tv.app/emote/66f0a612c48e0757a94aa641/4x.webp",
      name: "TwitchCon 2022 Rotterdam"
   },
   {
      url: "https://cdn.7tv.app/emote/66cff5ea4d26a84ee93b349a/4x.webp",
      shadow: "drop-shadow(rgb(0, 0, 0) 0px 0px 1px)",
      name: "Sunny ( ◥◣_◢◤ )"
   },
   {
      url: "https://cdn.7tv.app/emote/66c7cc5efefca9b2cbfa44aa/4x.webp",
      name: "Elements"
   },
   {
      url: "https://cdn.7tv.app/emote/66cc9863c66164d0fc0ca93b/4x.webp",
      shadow: "drop-shadow(rgb(73, 0, 122) 1px 1px 0.1px)",
      name: "Whisper"
   },
   {
      url: "https://cdn.7tv.app/emote/66c59abafefca9b2cbfa1ca5/4x.webp",
      shadow: "drop-shadow(rgb(238, 0, 255) 0px 0px 4px)",
      name: "Nammerino"
   },
   {
      url: "https://i.gifer.com/origin/ac/ac2ef163f44f7a3ffb0ab3a99ba4b98c_w200.gif",
      shadow: "drop-shadow(rgb(242, 0, 6) 0px 0px 1px) drop-shadow(rgb(255, 36, 250) 0px 0px 1px) drop-shadow(rgb(4, 30, 255) 0px 0px 1px) drop-shadow(rgb(6, 193, 255) 0px 0px 1px) drop-shadow(rgb(29, 255, 23) 0px 0px 1px) drop-shadow(rgb(163, 210, 0) 0px 0px 1px) drop-shadow(rgb(255, 145, 21) 0px 0px 1px) drop-shadow(rgb(255, 32, 32) 0px 0px 1px)",
      name: "Brainrot!"
   },
   {
      gradient: "radial-gradient(circle, rgb(255, 148, 148) 12%, rgb(229, 36, 75) 27%, rgb(255, 163, 163) 53%, rgb(243, 18, 74) 81%, rgb(225, 14, 14) 100%)",
      shadow: "drop-shadow(rgb(255, 0, 30) 0px 0px 0.1px)",
      name: "Erm."
   },
   {
      gradient: "linear-gradient(90deg, rgb(255, 164, 182) 0%, rgb(255, 255, 255) 20%, rgb(255, 164, 182) 40%, rgb(255, 255, 255) 60%, rgb(255, 164, 182) 80%, rgb(255, 255, 255) 100%)",
      shadow: "drop-shadow(rgb(221, 90, 160) 0px 0px 8px)",
      name: "Fairy Glow"
   },
   {
      gradient: "radial-gradient(circle, rgb(238, 255, 0) 0%, rgb(166, 255, 0) 50%, rgb(93, 195, 9) 100%)",
      shadow: "drop-shadow(rgb(189, 225, 9) 0px 0px 4px)",
      name: "Uranium"
   },
   {
      gradient: "radial-gradient(circle, #ffe5b8 10%, #fff 25%, #fe8b8b 35%, #fe9fc8 50%, #ff388e 75%, #ff006f 100%)",
      shadow: "drop-shadow(#ff007b 0px 0px 0.1px) drop-shadow(#ff007b 0px 0px 4px)",
      name: "Hibiscus"
   },
   {
      gradient: "repeating-linear-gradient(90deg, rgb(255, 196, 87) 0%, rgb(255, 130, 5) 8%, rgb(255, 102, 0) 16%, rgb(255, 136, 0) 24%, rgb(255, 189, 66) 32%)",
      shadow: "drop-shadow(rgb(255, 130, 5) 2px 2px 2px)",
      name: "Pumpkin Spice"
   },
   {
      gradient: "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(0, 191, 255) 25%, rgb(61, 181, 255) 30%, rgb(0, 204, 255) 40%, rgb(56, 179, 255) 50%, rgb(0, 145, 255) 60%, rgb(255, 255, 255) 100%)",
      shadow: "drop-shadow(rgb(0, 132, 255) 0px 0px 4px) drop-shadow(rgb(0, 63, 122) 0px 0px 0.1px)",
      name: "Crystalline"
   },
   {
      gradient: "repeating-radial-gradient(circle, rgb(82, 183, 255) 0%, rgb(255, 241, 92) 12%, rgb(254, 124, 236) 24%, rgb(93, 184, 248) 36%)",
      shadow: "drop-shadow(rgb(254, 124, 236) 0px 0px 0.1px) drop-shadow(rgb(254, 124, 236) 0px 0px 4px)",
      name: "Tie-Dye"
   },
   {
      url: "https://gachi.gay/WFmBZ",
      shadow: "drop-shadow(rgb(74, 165, 248) 0px 0px 0.5px)",
      name: "Blizzard"
   },
   {
      url: "https://cdn.7tv.app/emote/66f3e4a11ab6daa41ce1e880/4x.webp",
      shadow: "drop-shadow(rgb(255, 174, 237) 0px 0px 0.1px) drop-shadow(rgb(5, 111, 138) 1px 1px 0.1px)",
      name: "What!"
   },
   {
      gradient: "repeating-radial-gradient(circle, rgb(255, 211, 92) 72%, rgb(255, 136, 0) 87%, rgb(245, 122, 41) 88%, rgb(249, 218, 134) 95%)",
      shadow: "drop-shadow(rgb(204, 160, 0) 0px 0px 1px) drop-shadow(rgb(178, 75, 6) 0px 0px 3.5px)",
      name: "Solar Flare"
   },
   {
      gradient: "linear-gradient(90deg, rgb(241, 201, 227) 0%, rgb(241, 201, 227) 20%, rgb(241, 172, 217) 20%, rgb(241, 172, 217) 40%, rgb(242, 143, 207) 40%, rgb(242, 143, 207) 60%, rgb(242, 115, 196) 60%, rgb(241, 115, 195) 80%, rgb(242, 86, 185) 80%, rgb(242, 86, 185) 100%)",
      shadow: "drop-shadow(rgb(242, 86, 185) 0px 0px 0.5px) drop-shadow(rgb(242, 86, 185) 0px 0px 5px)",
      name: "Life in Plastic"
   }
];

const PaintSelector: React.FC<PaintSelectorProps> = ({ isOpen, onClose, onSelect }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <h2 className="text-3xl font-bold text-center text-white mb-6">Choose a Paint</h2>
         <div className="transition duration-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-2">
            {paints.map((paint, index) => (
               <div
                  key={index}
                  className={`relative cursor-pointer rounded-xl transition-all duration-200 hover:shadow-none hover:scale-105 bg-neutral-800 overflow-hidden shadow-lg ${paint.shadow ? 'shadow-lg' : ''}`}
                  onClick={() => onSelect(paint)}
                  title={paint.name}
                  style={{
                     backgroundImage: paint.gradient ? paint.gradient : undefined,
                     height: '150px',
                     filter: paint.shadow ? paint.shadow : undefined,
                  }}
               >
                  {paint.url && (
                     <img
                        src={paint.url}
                        alt={paint.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-300"
                     />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-neutral-600/60 backdrop-blur-xl text-white text-sm text-center p-2 truncate z-10">
                     {paint.name}
                  </div>
               </div>
            ))}
         </div>
      </Modal>
   );
};

export default PaintSelector;
