// src/components/Commands/CommandItem.tsx

import React from 'react';
import { Command } from '../../types/Commands';

interface CommandItemProps {
   command: Command;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
   return (
      <li className="p-4 bg-neutral-800/60 rounded-md shadow-md">
         <h3 className="text-lg font-semibold text-white">{command.title}</h3>
         <p className="text-gray-300">{command.description}</p>
         <p className="text-gray-400">Usage: <code>{command.usage}</code></p>
         <p className="text-gray-400">Category: {command.category}</p>
         <p className="text-gray-400">Aliases: {command.aliases.length > 0 ? command.aliases.join(', ') : 'none'}</p>
      </li>
   );
};

export default CommandItem;
