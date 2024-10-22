import React from 'react';
import ModalContainer from './ModalContainer';
import whatsNewData from '../whatsnew.json';

const Footer: React.FC = () => {
   const currentYear = new Date().getFullYear();

   // Funktion zum Öffnen des Modals
   const openModal = (addModal: (modal: React.ReactNode) => void) => {
      const modalContent = (
         <div className="text-white p-2">
            <h2 className="text-2xl font-bold border-b border-neutral-600 pb-2">{whatsNewData.version}</h2>
            <h3 className="font-semibold mt-4 text-2xl">Features:</h3>
            <ul className="list-disc list-inside ml-5 mt-2">
               {whatsNewData.features.map((feature, index) => (
                  <li key={index} className="mt-1">{feature}</li>
               ))}
            </ul>
            <h3 className="font-semibold mt-4 text-2xl">Bug Fixes:</h3>
            <ul className="list-disc list-inside ml-5 mt-2">
               {whatsNewData['bug-fixes'].map((bugFix, index) => (
                  <li key={index} className="mt-1">{bugFix}</li>
               ))}
            </ul>
            <p className={`mt-6 text-lg font-bold ${whatsNewData.author === 'prodbyeagle' ? 'eagle-text' : ''}`}>
               From: <span className="font-semibold">@{whatsNewData.author}</span>
            </p>
         </div>
      );
      addModal(modalContent);
   };

   return (
      <ModalContainer>
         {(addModal) => (
            <footer className="border border-neutral-600 bg-neutral-800/50 text-white text-center py-6 mt-4 rounded-xl backdrop-blur-xl flex flex-col items-center justify-center space-y-2 z-20">
               <p className="text-md text-neutral-400">
                  &copy; {currentYear}{' '}
                  <a
                     href="https://www.twitch.tv/ryanpotat"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="transition-all duration-300 transform gold-text hover:font-black "
                  >
                     PotatBotat
                  </a>
                  . All Rights Reserved.
               </p>
               <div className="flex items-center space-x-2 font-normal text-sm">
                  <p onClick={() => openModal(addModal)} className="transition-all p-1 rounded-xl hover:rounded-lg duration-300 transform bg-neutral-700/50 cursor-pointer hover:font-black">
                     Whats New?
                  </p>
                  <p>
                     Made by{' '}
                     <a
                        href="https://prodbyeagle.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all duration-300 transform eagle-text hover:font-black"
                     >
                        @prodbyeagle
                     </a>
                  </p>
                  <img
                     src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f49c/512.webp"
                     alt="Heart"
                     className="w-4 h-4"
                  />
               </div>
            </footer>
         )}
      </ModalContainer>
   );
};

export default Footer;
