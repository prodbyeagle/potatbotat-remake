// src/components/Commands/Commands.tsx

import React, { useEffect, useState } from 'react';
import CommandList from './CommandList';
import CommandLoader from './CommandLoader';
import { Command } from '../../types/Commands';
import { commandCategories } from '../../constants/Commands';

const Commands: React.FC = () => {
   const [commands, setCommands] = useState<Command[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

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
      const matchesCategory = selectedCategory === 'ALL' || command.category === selectedCategory;
      return matchesSearch && matchesCategory;
   });

   const categories = Object.keys(commandCategories);

   return (
      <div className="flex flex-col lg:flex-row lg:h-screen duration-100 transition-all bg-neutral-700/40 p-2 border border-neutral-600 backdrop-blur-lg rounded-xl text-white relative z-10">
         <aside className="w-full lg:w-1/6 bg-neutral-700/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 lg:h-auto mb-4 lg:mb-0">
            <h2 className="text-lg font-bold text-white mb-2">Categories</h2>
            <ul>
               <li>
                  <button
                     onClick={() => setSelectedCategory('ALL')}
                     className={`block w-full mb-2 text-left p-2 rounded-md duration-100 transition-all hover:bg-neutral-600 text-white ${selectedCategory === 'ALL' ? 'bg-neutral-600' : ''}`}>
                     All Categories
                  </button>
               </li>
               {categories.map(category => (
                  <li key={category}>
                     <button
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full mb-2 text-left p-2 rounded-md hover:bg-neutral-600 duration-100 transition-all text-white ${selectedCategory === category ? 'bg-neutral-600' : ''}`}>
                        {commandCategories[category as keyof typeof commandCategories]} {/* Zeige den Kategorie-Namen an */}
                     </button>
                  </li>
               ))}
            </ul>
         </aside>

         {/* Hauptinhalt */}
         <div className="flex-1">
            <div className="relative mb-2 z-20">
               <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[calc(100%-6px)] p-2 rounded-lg bg-neutral-700/40 border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:shadow-2xl mx-2"
               />
            </div>
            <CommandList commands={filteredCommands} />
         </div>
      </div>
   );
};

export default Commands;
