import React from 'react';
import Modal from '../Modal';
import { PaintSelectorProps } from '../../types/Paint';

const paints = [
   {
      url: "https://cdn.7tv.app/emote/667c887f387822a16b8f57ed/4x.webp",
      name: "TwitchCon 2024 Rotterdam"
   },
   {
      url: "https://cdn.7tv.app/emote/66f0a612c48e0757a94aa641/4x.webp",
      name: "TwitchCon 2022 Rotterdam"
   },
   {
      url: "https://cdn.7tv.app/emote/66cff5ea4d26a84ee93b349a/4x.webp",
      name: "Sunny ( ◥◣_◢◤ )"
   },
   {
      url: "https://cdn.7tv.app/emote/66c7cc5efefca9b2cbfa44aa/4x.webp",
      name: "Elements"
   },
   {
      url: "https://cdn.7tv.app/emote/66cc9863c66164d0fc0ca93b/4x.webp",
      name: "Whisper"
   },
   {
      url: "https://cdn.7tv.app/emote/66c59abafefca9b2cbfa1ca5/4x.webp",
      name: "Nammerino"
   },
   {
      url: "https://i.gifer.com/origin/ac/ac2ef163f44f7a3ffb0ab3a99ba4b98c_w200.gif",
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
   }
];

const PaintSelector: React.FC<PaintSelectorProps> = ({ isOpen, onClose, onSelect }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <h2 className="text-2xl font-semibold text-center text-white mb-6">Choose a Paint</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {paints.map((paint, index) => (
               <div
                  key={index}
                  className={`relative w-96 h-24 cursor-pointer rounded-xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg border border-neutral-600 bg-neutral-800 ${paint.shadow ? 'shadow-lg' : ''}`}
                  onClick={() => onSelect(paint)}
                  title={paint.name}
                  style={{
                     backgroundImage: paint.gradient ? paint.gradient : undefined,
                     filter: paint.shadow ? paint.shadow : undefined
                  }}
               >
                  {paint.url && (
                     <img
                        src={paint.url}
                        alt={paint.name}
                        className="absolute inset-0 w-full h-full object-cover"
                     />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm text-center p-2 truncate">
                     {paint.name}
                  </div>
               </div>
            ))}
         </div>
         <button
            onClick={onClose}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-xl transition hover:bg-red-700"
         >
            Close
         </button>
      </Modal>
   );
};

export default PaintSelector;
