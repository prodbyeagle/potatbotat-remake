// src/types/Commands.ts

export interface Command {
   name: string;
   description: string;
   title: string;
   usage: string;
   category: string;
   aliases: string[];
}
