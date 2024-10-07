// src/types/User.ts

export interface UserData {
   user: {
      user_id: number;
      username: string;
      first_seen: string;
      level: number;
      display: string;
      settings: {
         is_bot: boolean;
         language: string | null;
         no_reply: boolean;
         is_selfbot: boolean;
         ignore_dropped: boolean;
         color_responses: boolean;
      };
      connections: {
         user_id: number;
         id: string;
         username: string | null;
         display: string | null;
         pfp: string | null;
         platform: string;
         meta: {
            roles?: string[];
            color?: string;
         };
      }[];
   };
   channel: {
      joinedAt: string;
      prefix: string;
      state: string;
      editors: any[];
      ambassadors: any[];
   };
   potatoes: {
      joinedAt: string;
      count: number;
      prestige: number;
      rank: number;
      taxMultiplier: number;
      verbose: boolean;
      potato: {
         readyAt: number | null;
         ready: boolean;
         usage: number;
         averageResponse: string;
      };
      cdr: {
         readyAt: number | null;
         ready: boolean;
      };
      trample: {
         readyAt: number | null;
         ready: boolean;
         trampleCount: number;
         trampledCount: number;
         trampledBy: any | null;
      };
      steal: {
         readyAt: number | null;
         ready: boolean;
         stolenCount: number;
         theftCount: number;
         stoleBy: any | null;
         stolenAmount: any | null;
      };
      eat: {
         readyAt: number | null;
         ready: boolean;
      };
      quiz: {
         readyAt: number | null;
         ready: boolean;
         attempted: number;
         completed: number;
      };
      gamble: {
         winCount: number;
         loseCount: number;
         totalWins: number;
         totalLosses: number;
      };
      duel: {
         winCount: number;
         loseCount: number;
         totalWins: number;
         totalLosses: number;
         caughtLosses: number;
      };
   };
}
