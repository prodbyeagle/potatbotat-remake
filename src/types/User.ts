// src/types/User.ts

export interface TwitchUser {
   twitch_pfp: string;
   stv_pfp?: string;
   name: string;
   chatColor?: string;
   userPaint?: string;
}

export interface UserState {
   id: string;
   login: string;
   name: string;
   stv_id: string;
   is_channel: boolean;
}

export interface AuthorizationToken {
   value: string | null;
}