// src/components/Commands/CommandItem.tsx

import React from 'react';
import { Command } from '../../types/Commands';
import { userRequires, botRequires } from '../../constants/Permissions';

interface CommandItemProps {
   command: Command;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
   return (
      <li className="p-4 border border-neutral-600 bg-transparent rounded-xl">
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
            <span className="font-semibold">Conditions:</span> {command.conditions ? JSON.stringify(command.conditions) : 'none'}
         </p>
         {/* other stats but dont needed */}
         {/* <p className="text-gray-400 mb-1">
            <span className="font-semibold">Whitelist:</span> {command.whitelist ? command.whitelist.join(', ') : 'none'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Blacklist:</span> {command.blacklist ? command.blacklist.join(', ') : 'none'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Usage Count:</span> {command.usageCount || '0'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Silent:</span> {command.silent ? 'true' : 'false'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Is Disabled:</span> {command.isDisabled ? 'true' : 'false'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Safed Settings:</span> {command.safedSettings ? JSON.stringify(command.safedSettings) : 'none'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">File Name:</span> {command.fileName || 'none'}
         </p>
         <p className="text-gray-400 mb-1">
            <span className="font-semibold">Level:</span> {command.level || 'none'}
         </p> */}
      </li>
   );
};

export default CommandItem;
