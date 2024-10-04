// src/constants/Permissions.ts

export const userRequires = {
   'NONE': 'No Permissions',
   'SUBSCRIBER': 'Subscriber',
   'VIP': 'VIP',
   'MOD': 'Moderator',
   'AMBASSADOR': 'Ambassador',
   'BROADCASTER': 'Broadcaster',
} as const;

export const botRequires = {
   'NONE': 'No Permissions',
   'MOD': 'Moderator',
   'VIP': 'VIP',
} as const;
