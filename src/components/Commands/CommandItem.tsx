// src/components/Commands/CommandItem.tsx

import React from 'react';
import { Command } from '../../types/Commands';
import { userRequires, botRequires } from '../../constants/Permissions';

interface CommandItemProps {
   command: Command;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
   const renderConditions = () => {
      const conditions = command.conditions || {};

      return (
         <div className="text-gray-400">
            <span className="font-semibold mb-20">Whisperable:</span> {conditions.whisperable ? '✅' : '❌'} <br />
            <span className="font-semibold">Offline Only:</span> {conditions.offlineOnly ? '✅' : '❌'} <br />
            <span className="font-semibold">Ignore Bots:</span> {conditions.ignoreBots ? '✅' : '❌'}
         </div>
      );
   };

   return (
      <li className="p-4 border border-neutral-600 bg-transparent rounded-md">
         <h3 className="text-xl font-bold text-white mb-2">
            {command.title}
            <span className="text-gray-500 italic ml-2">
               ({command.aliases.length > 0 ? command.aliases.join(', ') : '❌'})
            </span>
         </h3>
         <p className="text-gray-300 mb-1">{command.description}</p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Usage:</span> <code>{command.usage}</code>
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Category:</span> {command.category}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Cooldown:</span> {command.cooldown ? `${command.cooldown / 1000} seconds` : 'none'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Bot Requires:</span> {command.botRequires ? botRequires[command.botRequires] : 'none'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">User Requires:</span> {command.userRequires ? userRequires[command.userRequires] : 'none'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold"></span> {renderConditions()}
         </p>
      </li>
   );
};

export default CommandItem;
