export interface StatsData {
   misc: {
      commandsUsed: number;
      emotesAdded: number;
   };
   twitch: {
      activeChannels: number;
      usersSeen: number;
   };
   potato: {
      total: number;
      updateCount?: number;
   };
}
