// src/components/Commands/CommandItem.tsx

import React from 'react';
import { Command } from '../../types/Commands';
import { userRequires, botRequires } from '../constants/Permissions';

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
         <p className="text-gray-400">Cooldown: {command.cooldown ? `${command.cooldown / 1000} seconds` : 'none'}</p>
         <p className="text-gray-400">Bot Requires: {command.botRequires ? botRequires[command.botRequires] : 'none'}</p>
         <p className="text-gray-400">User Requires: {command.userRequires ? userRequires[command.userRequires] : 'none'}</p>
         <p className="text-gray-400">Conditions: {command.conditions ? JSON.stringify(command.conditions) : 'none'}</p>
         {/* <p className="text-gray-400">Whitelist: {command.whitelist ? command.whitelist.join(', ') : 'none'}</p>
         <p className="text-gray-400">Blacklist: {command.blacklist ? command.blacklist.join(', ') : 'none'}</p>
         <p className="text-gray-400">Usage Count: {command.usageCount || '0'}</p> */}
         {/* <p className="text-gray-400">Silent: {command.silent ? 'true' : 'false'}</p> */}
         {/* <p className="text-gray-400">Is Disabled: {command.isDisabled ? 'true' : 'false'}</p> */}
         {/* <p className="text-gray-400">Safed Settings: {command.safedSettings ? JSON.stringify(command.safedSettings) : 'none'}</p> */}
         {/* <p className="text-gray-400">File Name: {command.fileName || 'none'}</p> */}
         {/* <p className="text-gray-400">Level: {command.level || 'none'}</p> */}
      </li>
   );
};

export default CommandItem;
