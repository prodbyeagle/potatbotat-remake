const Footer: React.FC = () => {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="border border-neutral-600 bg-neutral-800/50 text-white text-center py-6 mt-4 rounded-xl backdrop-blur-xl flex flex-col items-center justify-center space-y-2 z-20">
         <p className="text-md text-neutral-400">
            &copy; {currentYear}{' '}
            <a
               href="https://www.twitch.tv/ryanpotat"
               target="_blank"
               rel="noopener noreferrer"
               className="transition-all duration-300 transform bronze-text hover:font-black"
            >
               PotatBotat
            </a>
            . All Rights Reserved.
         </p>
         <div className="flex items-center space-x-2 font-extralight text-sm">
            <p>
               Made by{' '}
               <a
                  href="https://twitter.com/prodbyeagle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 transform eagle-text hover:font-black"
               >
                  @prodbyeagle
               </a>
            </p>
            <img
               src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f49c/512.webp"
               alt="Herz"
               className="w-4 h-4"
            />
         </div>
      </footer>
   );
};

export default Footer;
