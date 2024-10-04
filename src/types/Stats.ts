export interface StatsData {
   misc: {
      commandsUsed: number;
      emotesAdded: number;
   };
   twitch: {
      activeChannels: number;
   };
   potato: {
      total: number;
      updateCount?: number;
   };
}
