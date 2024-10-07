// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface TwitchUser {
   chatColor: string | null;
   userPaint: any | null;
   botPaint: any | null;
   stv_pfp: string | null;
   twitch_pfp: string | null;
   name: string | null;
}

const useAuth = () => {
   const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authorization'));
   const [userState, setUserState] = useState<any | null>(localStorage.getItem('userState'));
   const [twitchUser, setTwitchUser] = useState<TwitchUser | null>(null);
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!authToken && !!userState);

   useEffect(() => {
      if (authToken) {
         assignUser(); // Lade den Benutzer, wenn ein Token vorhanden ist
      }

      const handleMessage = (event: MessageEvent) => {
         // Stelle sicher, dass der Message-Event vom richtigen Origin kommt
         if (event.origin !== 'https://api.potat.app') return;

         const { token, user } = event.data;

         if (token) {
            // Speichere den Token und Benutzerstatus lokal
            localStorage.setItem('authorization', token);
            localStorage.setItem('userState', JSON.stringify(user));
            setAuthToken(token);
            setUserState(user);
            setIsAuthenticated(true);
         }
      };

      window.addEventListener('message', handleMessage);

      return () => window.removeEventListener('message', handleMessage);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [authToken]);

   const signIn = () => {
      console.log("signin called")
      window.open(
         'https://api.potat.app/login',
         '_blank',
         'width=600,height=400'
      );
   };

   const signOut = () => {
      localStorage.clear();
      setAuthToken(null);
      setUserState(null);
      setTwitchUser(null);
      setIsAuthenticated(false);
   };

   const assignUser = async () => {
      try {
         const response = await fetch('https://api.potat.app/twitch', {
            headers: { Authorization: `Bearer ${authToken}` },
         });

         const data = await response.json();

         if (data.errors) {
            console.error('API Error:', data.errors[0]?.message);
         }

         if ([401, 418].includes(data?.statusCode)) {
            signOut();
            return;
         }

         setTwitchUser(data.data[0]);
      } catch (error) {
         console.error('Error fetching Twitch user data:', error);
      }
   };

   return {
      isAuthenticated,
      twitchUser,
      signIn,
      signOut,
   };
};

export default useAuth;
