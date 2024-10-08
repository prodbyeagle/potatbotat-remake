// src/components/Commands/CommandList.tsx

import React from 'react';
import CommandItem from './CommandItem';
import { Command } from '../../types/Commands';

interface CommandListProps {
   commands: Command[];
}

const CommandList: React.FC<CommandListProps> = ({ commands }) => {
   return (
      <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-lg p-2 shadow-lg h-[calc(100vh-63px)] overflow-y-auto ml-0 md:ml-2">
         {/* <h2 className="text-2xl font-bold text-white mb-4">Commands</h2> */}
         <ul className="space-y-2">
            {commands.length > 0 ? (
               commands.map((command) => (
                  <CommandItem key={command.name} command={command} />
               ))
            ) : (
               <li className="p-4 bg-neutral-800 rounded-md text-white">No commands found.</li>
            )}
         </ul>
      </div>
   );
};

export default CommandList;
