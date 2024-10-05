// src/components/Commands/Commands.tsx

import React, { useEffect, useState } from 'react';
import CommandList from './CommandList';
import CommandLoader from './CommandLoader';
import { Command } from '../../types/Commands';

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
      return <CommandLoader />;
   }

   const filteredCommands = commands.filter(command => {
      const matchesSearch = command.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || command.category === selectedCategory;
      return matchesSearch && matchesCategory;
   });

   const categories = Array.from(new Set(commands.map(command => command.category)));

   return (
      <div className="flex flex-col lg:flex-row lg:h-screen duration-100 transition-all bg-neutral-700/40 p-2 border border-neutral-600 backdrop-blur-lg rounded-xl text-white z-auto">
         <aside className="w-full lg:w-1/6 bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 lg:h-auto mb-4 lg:mb-0">
            <h2 className="text-lg font-bold text-white mb-2">Categories</h2>
            <ul>
               <li>
                  <button
                     onClick={() => setSelectedCategory('all')}
                     className={`block w-full mb-2 text-left p-2 rounded-md duration-100 transition-all hover:bg-neutral-600 text-white ${selectedCategory === 'all' ? 'bg-neutral-600' : ''}`}>
                     All Categories
                  </button>
               </li>
               {categories.map(category => (
                  <li key={category}>
                     <button
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full mb-2 text-left p-2 rounded-md hover:bg-neutral-600 duration-100 transition-all text-white ${selectedCategory === category ? 'bg-neutral-600' : ''}`}>
                        {category}
                     </button>
                  </li>
               ))}
            </ul>
         </aside>

         {/* Hauptinhalt */}
         <div className="flex-1">
            <div className="sticky top-0 rounded-md z-auto mb-2">
               <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 rounded-md bg-transparent border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mx-2"
               />
            </div>
            <CommandList commands={filteredCommands} />
         </div>
      </div>
   );
};

export default Commands;
