import React, { useEffect, useState } from 'react';

interface Command {
   name: string;
   description: string;
   title: string;
   usage: string;
   category: string;
   aliases: string[];
}

const Commands: React.FC = () => {
   const [commands, setCommands] = useState<Command[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [selectedCategory, setSelectedCategory] = useState<string>('all');

   useEffect(() => {
      const fetchCommands = async () => {
         try {
            const response = await fetch('https://api.potat.app/help');
            const data = await response.json();
            setCommands(data);
         } catch (error) {
            console.error('Error fetching commands:', error);
         } finally {
            setLoading(false);
         }
      };

      fetchCommands();
   }, []);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen bg-neutral-900/50 backdrop-blur-md">
            <div className="flex flex-col items-center">
               <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30d/512.webp"
                  alt="Loading Emoji"
                  className="w-16 h-16"
               />
               <p className="text-lg text-white mt-4">Loading commands...</p>
            </div>
         </div>
      );
   }

   const filteredCommands = commands.filter(command => {
      const matchesSearch = command.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || command.category === selectedCategory;
      return matchesSearch && matchesCategory;
   });

   const categories = Array.from(new Set(commands.map(command => command.category)));

   return (
      <div className="flex flex-col lg:flex-row h-screen bg-neutral-700/40 p-2 backdrop-blur-lg rounded-xl text-white z-auto">
         <aside className="w-full lg:w-1/4 bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 h-fit mb-4 lg:mb-0">
            <h2 className="text-lg font-bold text-white mb-2">Categories</h2>
            <ul>
               <li>
                  <button
                     onClick={() => setSelectedCategory('all')}
                     className={`block w-full mb-2 text-left p-2 rounded-md hover:bg-neutral-600 text-white ${selectedCategory === 'all' ? 'bg-neutral-600' : ''}`}>
                     All Categories
                  </button>
               </li>
               {categories.map(category => (
                  <li key={category}>
                     <button
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full mb-2 text-left p-2 rounded-md hover:bg-neutral-600 text-white ${selectedCategory === category ? 'bg-neutral-600' : ''}`}>
                        {category}
                     </button>
                  </li>
               ))}
            </ul>
         </aside>

         <div className="flex-1">
            <div className="sticky top-0 rounded-md z-auto mb-2">
               <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 rounded-md bg-transparent border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-3 md:ml-2"
               />
            </div>

            <div className="bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 shadow-lg h-[calc(100vh-60px)] overflow-y-auto ml-3 md:ml-2">
               <h2 className="text-2xl font-bold text-white mb-4">Commands</h2>
               <ul className="space-y-4">
                  {filteredCommands.length > 0 ? (
                     filteredCommands.map((command) => (
                        <li key={command.name} className="p-4 bg-neutral-800/60 rounded-md shadow-md">
                           <h3 className="text-lg font-semibold text-white">{command.title}</h3>
                           <p className="text-gray-300">{command.description}</p>
                           <p className="text-gray-400">Usage: <code>{command.usage}</code></p>
                           <p className="text-gray-400">Category: {command.category}</p>
                           <p className="text-gray-400">Aliases: {command.aliases.length > 0 ? command.aliases.join(', ') : 'none'}</p>
                        </li>
                     ))
                  ) : (
                     <li className="p-4 bg-neutral-800 rounded-md text-white">No commands found.</li>
                  )}
               </ul>
            </div>
         </div>

      </div>
   );
};

export default Commands;
