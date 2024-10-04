// src/types/Commands.ts
import { userRequires, botRequires } from '../components/constants/Permissions'; // Update import path accordingly

export interface Command {
   name: string;
   description: string;
   title: string;
   usage: string;
   category: string;
   aliases: string[];
   flags?: string[];
   cooldown?: number;
   level?: number;
   botRequires?: keyof typeof botRequires;
   userRequires?: keyof typeof userRequires;
   conditions?: {
      whisperable?: boolean;
      offlineOnly?: boolean;
      ignoreBots?: boolean;
   };
   usageCount?: number;
}