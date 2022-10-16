import React from 'react';
import BadgeCardUR from './badgeImages/BadgeCardUR.png';
import BadgeCardSR from './badgeImages/BadgeCardSR.png';
import BadgeCardR from './badgeImages/BadgeCardR.png';
import BadgeCardN from './badgeImages/BadgeCardN.png';
import BadgeN from './badgeImages/BadgeN.png';
import BadgeR from './badgeImages/BadgeR.png';
import BadgeSR from './badgeImages/BadgeSR.png';
import BadgeUR from './badgeImages/BadgeUR.png';
import { IBadge } from '../../models/interfaces';

interface Props {
    currentBadge: IBadge[];
    cardSize: number;
}

const BadgeCard: React.FC<Props> = (props) => {
    return (
        <>
            {props.currentBadge.map((badge) => (
                <div
                    style={{ height: props.cardSize, width: props.cardSize }}
                    key="badgeCard"
                    className="text-grey-600"
                >
                    <img
                        src={
                            badge.rarity == 'UR'
                                ? BadgeCardUR
                                : badge.rarity == 'SR'
                                ? BadgeCardSR
                                : badge.rarity == 'R'
                                ? BadgeCardR
                                : BadgeCardN
                        }
                    />
                    <img
                        src={
                            badge.rarity == 'UR'
                                ? BadgeUR
                                : badge.rarity == 'SR'
                                ? BadgeSR
                                : badge.rarity == 'R'
                                ? BadgeR
                                : BadgeN
                        }
                        style={{
                            height: (props.cardSize * 2) / 3,
                            position: 'relative',
                            top: (-props.cardSize * 392) / 400,
                            left: props.cardSize / 6,
                        }}
                    />
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: props.cardSize / 20,
                            position: 'relative',
                            top: (-props.cardSize * 555) / 400,
                            left:
                                (props.cardSize * 200) / 400 -
                                (badge.title.length * props.cardSize) / 80,
                        }}
                    >
                        {badge.title}
                    </div>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: props.cardSize / 10,
                            position: 'relative',
                            top: (-props.cardSize * 390) / 400,
                            left:
                                (props.cardSize * 47) / 400 -
                                (badge.rarity.length * props.cardSize) / 40,
                        }}
                    >
                        {badge.rarity}
                    </div>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: props.cardSize / 20,
                            position: 'relative',
                            top: (-props.cardSize * 473) / 400,
                            left:
                                (props.cardSize * 250) / 400 -
                                (badge.name.length * props.cardSize) / 80,
                        }}
                    >
                        {badge.name}
                    </div>
                    <div
                        style={{
                            width: (props.cardSize * 80) / 400,
                            textAlign: 'right',
                            fontWeight: 'bold',
                            fontSize: props.cardSize / 30,
                            position: 'relative',
                            top: (-props.cardSize * 770) / 400,
                            left: (props.cardSize * 300) / 400,
                        }}
                    >
                        {badge.awardedAt.getMonth()}/{badge.awardedAt.getDate()}/
                        {badge.awardedAt.getFullYear()}
                    </div>
                    <div
                        style={{
                            width: (props.cardSize * 260) / 400,
                            fontWeight: 'bold',
                            fontSize: props.cardSize / 30,
                            position: 'relative',
                            top: (-props.cardSize * 480) / 400,
                            left: (props.cardSize * 120) / 400,
                        }}
                    >
                        {badge.description}
                    </div>
                </div>
            ))}
        </>
    );
};
export default BadgeCard;
