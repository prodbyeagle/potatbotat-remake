// src/types/Leaderboard.ts

export interface LeaderboardEntry {
   bestName: string;
   farmSize?: number;
   farmName?: string;
   prestige?: number;
   potatoCount?: number;
   emote_count?: number;
   trivia_wins?: number;
   scramble_wins?: number;
   paint_count?: number;
   badge_count?: number;
   user_pfp: string;
   user_color: string | null;
}

export interface LeaderboardEntryProps {
   entry: {
      bestName: string;
      farmSize?: number;
      farmName?: string;
      prestige?: number;
      potatoCount?: number;
      emote_count?: number;
      trivia_wins?: number;
      scramble_wins?: number;
      paint_count?: number;
      badge_count?: number;
      user_pfp: string;
      user_color: string | null;
   };
   type: string;
}

export type LeaderboardType = 'potatoes' | 'trivia' | 'scramble' | 'paints' | 'badges' | 'emoteschannel' | 'emotesuser';
