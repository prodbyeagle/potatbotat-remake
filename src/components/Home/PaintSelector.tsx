// src/components/Home/PaintSelector.tsx

import React from 'react';
import Modal from '../Modal';

const paints = [
   { url: "https://cdn.7tv.app/emote/667c887f387822a16b8f57ed/4x.webp", name: "TwitchCon 2024 Rotterdam" },
   { url: "https://cdn.7tv.app/emote/66f0a612c48e0757a94aa641/4x.webp", name: "Paint 3" },
   { url: "https://cdn.7tv.app/emote/66cff5ea4d26a84ee93b349a/4x.webp", name: "Sunny ( ◥◣_◢◤ )" },
   { url: "https://cdn.7tv.app/emote/66c7cc5efefca9b2cbfa44aa/4x.webp", name: "Elements" },
   { url: "https://cdn.7tv.app/emote/66cc9863c66164d0fc0ca93b/4x.webp", name: "Whisper" },
   { url: "https://cdn.7tv.app/emote/66c59abafefca9b2cbfa1ca5/4x.webp", name: "Nammerino" },
   { url: "https://i.gifer.com/origin/ac/ac2ef163f44f7a3ffb0ab3a99ba4b98c_w200.gif", name: "LOL" }
];

interface PaintSelectorProps {
   isOpen: boolean;
   onClose: () => void;
   onSelect: (paintUrl: string) => void;
}

const PaintSelector: React.FC<PaintSelectorProps> = ({ isOpen, onClose, onSelect }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <h2 className="text-xl text-white mb-4">Select a Paint:</h2>
         <div className="grid grid-cols-4 gap-4">
            {paints.map((paint, index) => (
               <div
                  key={index}
                  className="relative w-60 h-32 cursor-pointer rounded-xl overflow-hidden transition-transform transform hover:scale-105 border border-neutral-600"
                  onClick={() => onSelect(paint.url)}
                  title={paint.name}
               >
                  <img
                     src={paint.url}
                     alt={paint.name}
                     className="absolute inset-0 w-full h-full object-cover"
                  />
               </div>
            ))}
         </div>
      </Modal>
   );
};

export default PaintSelector;
