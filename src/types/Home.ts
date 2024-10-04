// src/types/Home.ts

export interface Partner {
   id: string;
   followers: number;
   command_count: number;
   joined_at: string;
   page_url: string;
   user_color: string | null;
   display: string;
   twitch_pfp: string;
   username: string;
}