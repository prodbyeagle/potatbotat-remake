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

   const filteredCommands = commands
      .filter(command => {
         const searchLower = searchTerm.toLowerCase();
         const isAliasSearch = searchLower.startsWith('#');
         const searchWithoutHash = searchLower.slice(1);

         const aliasMatches = command.aliases.some(alias => {
            const aliasLower = alias.toLowerCase();
            if (aliasLower === searchWithoutHash) return true;
            if (aliasLower.startsWith(searchWithoutHash)) return true;
            if (aliasLower.includes(searchWithoutHash)) return true;
            if (aliasLower.endsWith(searchWithoutHash)) return true;
            return false;
         });

         const titleMatches = command.title.toLowerCase().includes(searchLower);

         const matchesSearch = isAliasSearch ? aliasMatches : titleMatches;
         const matchesCategory = selectedCategory === 'ALL' || command.category === selectedCategory;
         return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
         const searchLower = searchTerm.toLowerCase();
         const searchWithoutHash = searchLower.slice(1);

         if (searchLower.startsWith('#')) {
            const aliasA = a.aliases.some(alias => alias.toLowerCase() === searchWithoutHash) ? 1 : 0;
            const aliasB = b.aliases.some(alias => alias.toLowerCase() === searchWithoutHash) ? 1 : 0;
            return aliasB - aliasA;
         }
         return 0;
      });

   const categories = Object.keys(commandCategories);

   return (
      <div className="flex flex-col lg:flex-row lg:h-screen duration-100 transition-all bg-neutral-700/40 p-2 border border-neutral-600 backdrop-blur-lg rounded-xl text-white relative z-10">
         <aside className="w-full lg:w-1/6 bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-4 lg:h-auto mb-2 lg:mb-0">
            <h2 className="text-lg font-bold text-white mb-2">Categories</h2>
            <ul>
               <li>
                  <button
                     onClick={() => setSelectedCategory('ALL')}
                     className={`block w-full mb-2 text-left p-2 rounded-md duration-100 transition-all hover:bg-neutral-700/50 text-white ${selectedCategory === 'ALL' ? 'bg-neutral-600' : ''}`}>
                     All Categories
                  </button>
               </li>
               {categories.map(category => (
                  <li key={category}>
                     <button
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full mb-2 text-left p-2 rounded-md hover:bg-neutral-700/50 duration-100 transition-all text-white ${selectedCategory === category ? 'bg-neutral-600' : ''}`}>
                        {commandCategories[category as keyof typeof commandCategories]}
                     </button>
                  </li>
               ))}
            </ul>
         </aside>

         <div className="flex-1">
            <div className="relative mb-2 z-20">
               {searchTerm.startsWith('#') && (
                  <label
                     htmlFor="command-search"
                     className="absolute top-1 left-3 bg-neutral-700 text-normal p-1 rounded-md text-white"
                  >
                     alias:
                  </label>
               )}
               <input
                  id="command-search"
                  type="text"
                  placeholder="Search commands or aliases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-[calc(100%-7px)] p-2 rounded-lg bg-neutral-800/40 border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:shadow-2xl md:ml-2 
         ${searchTerm.startsWith('#') ? 'pl-16' : 'pl-4'}`}
               />
            </div>
            <CommandList commands={filteredCommands} />
         </div>

      </div>
   );
};

export default Commands;
