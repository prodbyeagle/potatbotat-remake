//src/types/Emote.ts

export interface Emote {
   id: string;
   name: string;
   format: string;
   url: string;
}

export interface EmoteDetails {
   channelID: string;
   channelLogin: string;
   channelName: string;
   emoteID: string;
   emoteCode: string;
   emotePrefix: string;
   emoteSuffix: string;
   emoteURL: string;
   emoteSetID: string;
   emoteAssetType: string;
   emoteState: string;
   emoteType: string;
   emoteTier: number;
   source: string;
}