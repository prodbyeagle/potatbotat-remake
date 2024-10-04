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
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-b-4 border-neutral-600"></div>
               <p className="text-lg text-white mt-4">Loading commands...</p>
            </div>
         </div>
      );
   }


   // Filter commands based on search term and selected category
   const filteredCommands = commands.filter(command => {
      const matchesSearch = command.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || command.category === selectedCategory;
      return matchesSearch && matchesCategory;
   });

   // Get unique categories for sidebar
   const categories = Array.from(new Set(commands.map(command => command.category)));

   return (
      <div className="flex h-screen">
         {/* Sidebar for categories */}
         <aside className="w-1/4 bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 h-fit">
            <h2 className="text-lg font-bold text-white mb-2">Categories</h2>
            <ul>
               <li>
                  <button
                     onClick={() => setSelectedCategory('all')}
                     className={`block w-full text-left p-2 rounded-md hover:bg-neutral-600 text-yellow-400 ${selectedCategory === 'all' ? 'bg-neutral-600' : ''}`}>
                     @all
                  </button>
               </li>
               {categories.map(category => (
                  <li key={category}>
                     <button
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full mb-1 text-left p-2 rounded-md hover:bg-neutral-600 text-white ${selectedCategory === category ? 'bg-neutral-600' : ''}`}>
                        @{category}
                     </button>
                  </li>
               ))}
            </ul>
         </aside>

         <div className="flex-1 p-2">
            {/* Search input - fixed */}
            <div className="sticky top-0 bg-neutral-800 p-2 rounded-md z-10 mb-4">
               <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
               />
            </div>

            {/* Container for commands with earlier overflow */}
            <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-8 shadow-lg h-[calc(100vh-200px)] overflow-y-auto">
               <h2 className="text-2xl font-bold text-white mb-4">Commands</h2>
               <ul className="space-y-4">
                  {filteredCommands.length > 0 ? (
                     filteredCommands.map((command) => (
                        <li key={command.name} className="p-4 bg-neutral-700 rounded-md">
                           <h3 className="text-lg font-semibold text-white">{command.title}</h3>
                           <p className="text-gray-300">{command.description}</p>
                           <p className="text-gray-400">Usage: <code>{command.usage}</code></p>
                           <p className="text-gray-400">Category: {command.category}</p>
                           <p className="text-gray-400">Aliases: {command.aliases.join(', ')}</p>
                        </li>
                     ))
                  ) : (
                     <li className="p-4 bg-neutral-700 rounded-md text-white">No commands found.</li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Commands;
