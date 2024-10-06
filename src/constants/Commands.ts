// src/constants/Commands.ts

export const commandCategories = {
   'emotes': 'Emotes',
   'anime': 'Anime',
   'spam': 'Spam',
   'utilities': 'Utilities',
   'settings': 'Settings',
   'fun': 'Fun',
   'moderation': 'Moderation',
   'development': 'Development',
   'stream': 'Stream',
   'deprecated': 'Deprecated',
   'potato': 'Potato',
} as const;

export type CommandCategory = keyof typeof commandCategories;
