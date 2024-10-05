// src/components/Home/PartnerCard.tsx

import React from 'react';
import { Partner } from '../../types/Home';

interface PartnerCardProps {
   partner: Partner;
   animationClass: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, animationClass }) => {
   const formatJoinedAt = (joinedAt: string) => {
      const joinedDate = new Date(joinedAt);
      const now = new Date();
      const monthsDiff = now.getMonth() - joinedDate.getMonth() + (12 * (now.getFullYear() - joinedDate.getFullYear()));
      const daysDiff = now.getDate() - joinedDate.getDate();

      const daysCount = daysDiff < 0 ? new Date(now.getFullYear(), now.getMonth(), 0).getDate() + daysDiff : daysDiff;

      return `Joined ${monthsDiff} Months and ${daysCount} days ago`;
   };

   return (
      <div className={`mt-8 p-4 bg-transparent border border-neutral-600 rounded-xl flex items-center space-x-4 transition-all duration-100 ${animationClass}`}>
         <img
            src={partner.twitch_pfp}
            alt={`${partner.display}'s profile`}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
         />
         <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl font-bold" style={{ color: partner.user_color || 'white' }}>
               @{partner.display}
            </h2>
            <p className="text-gray-300">Followers: {partner.followers.toLocaleString()}</p>
            <p className="text-gray-300">Commands: {partner.command_count}</p>
            <p className="text-gray-300">{formatJoinedAt(partner.joined_at)}</p>
            <a href={partner.page_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
               Visit Profile
            </a>
         </div>
      </div>
   );
};

export default PartnerCard;
