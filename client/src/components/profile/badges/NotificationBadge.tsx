import React from 'react';
import { IBadge } from '../../../models/interfaces';
import { BadgeImageMap } from '../../../utils/badge';

// Toast badge reward component
// Notification badge
const NotificationBadge: React.FC<{ badge: IBadge }> = ({ badge }) => {
    return (
        <div className="flex items-center gap-2">
            <div>
                <img
                    className="h-[9rem] max-w-[15rem] object-cover"
                    src={BadgeImageMap[badge.rarity]}
                    alt={badge.name}
                />
            </div>
            <h3>
                Badge <strong className="text-blue-200">{badge.name}</strong> Awarded!
            </h3>
        </div>
    );
};

export default NotificationBadge;
