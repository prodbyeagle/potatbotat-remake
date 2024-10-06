// src/constants/Leaderboard.ts

export const leaderboardCategories = {
   potatoes: 'Potatoes',
   trivia: 'Trivia',
   scramble: 'Scramble',
   paints: 'Paints',
   badges: 'Badges',
   emoteschannel: 'Emotes (Channel)',
   emotesuser: 'Emotes (User)',
} as const;

export type LeaderboardCategory = keyof typeof leaderboardCategories;
