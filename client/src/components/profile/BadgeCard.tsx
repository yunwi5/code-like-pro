import React, {useEffect, useState} from 'react';
import BadgeN from '../../assets/badgeImages/BadgeN.png';
import BadgeR from '../../assets/badgeImages/BadgeR.png';
import BadgeSR from '../../assets/badgeImages/BadgeSR.png';
import BadgeUR from '../../assets/badgeImages/BadgeUR.png';
import { IBadge } from '../../models/interfaces';

const textPadding = 5;

interface Props {
    currentBadge: IBadge[];
    cardSize: number;
}

function convertDate(d : Date){
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const month = months[d.getMonth()];
    const day = (d.getDate()%10==1)?'st':(d.getDate()%10==2)?'nd':(d.getDate()%10==3)?'rd':'th';
    return d.getDate() + day + ', ' + ' ' + month + ', ' + d.getFullYear();
}

const BadgeCard: React.FC<Props> = (props) => {
    return (
        <>
            {props.currentBadge.map((badge)=>(
                <div style={{height:props.cardSize/3, width:props.cardSize/3*2}} key='badgeCard' className='text-grey-600 grid grid-cols-4 grid-rows-5 border border-solid border-main-400'>
                    <div className='col-span-2 row-span-5 border border-solid border-main-400'>
                        <img src={(badge.rarity=='UR')?BadgeUR:(badge.rarity=='SR')?BadgeSR:(badge.rarity=='R')?BadgeR:BadgeN}/>
                    </div>
                    <div className='col-span-2 border border-solid border-main-400' style={{padding:textPadding}}>
                        <b className='text-main-400'>Title:</b> {badge.title}
                    </div>
                    <div className='col-span-2 border border-solid border-main-400' style={{padding:textPadding}}>
                        <b className='text-main-400'>Prerequisite:</b> {badge.name}
                    </div>
                    <div className='col-span-2 border border-solid border-main-400' style={{padding:textPadding}}>
                        <b className='text-main-400'>Awarded At:</b> {convertDate(badge.awardedAt)}
                    </div>
                    <div className='col-span-2 row-span-2 border border-solid border-main-400' style={{padding:textPadding}}>
                        <b className='text-main-400'>Description:</b> {badge.description}
                    </div>
                </div>
            ))}
        </>
    );
}
export default BadgeCard;


// Since we will not use fixed position and img card, the below lines are abandoned at the moment.

// const BadgeCard: React.FC<Props> = (props) => {
//     return (
//         <>
//             {props.currentBadge.map((badge)=>(
//                 <div style={{height:props.cardSize, width:props.cardSize}} key='badgeCard' className='text-grey-600'>
//                     <img src={(badge.rarity=='UR')?BadgeCardUR:(badge.rarity=='SR')?BadgeCardSR:(badge.rarity=='R')?BadgeCardR:BadgeCardN} />
//                     <img src={(badge.rarity=='UR')?BadgeUR:(badge.rarity=='SR')?BadgeSR:(badge.rarity=='R')?BadgeR:BadgeN} 
//                     style={{
//                         height:props.cardSize*2/3,
//                         position:'relative',
//                         top:-props.cardSize*392/400,
//                         left:props.cardSize/6,
//                     }}/>
//                     <div style={{
//                         fontWeight: 'bold',
//                         fontSize: props.cardSize/20,
//                         position:'relative',
//                         top:-props.cardSize*555/400,
//                         left:props.cardSize*200/400-badge.title.length*props.cardSize/80,
//                     }}>{badge.title}</div>
//                     <div style={{
//                         fontWeight: 'bold',
//                         fontSize: props.cardSize/10,
//                         position:'relative',
//                         top:-props.cardSize*390/400,
//                         left:props.cardSize*47/400-badge.rarity.length*props.cardSize/40,
//                     }}>{badge.rarity}</div>
//                     <div style={{
//                         fontWeight: 'bold',
//                         fontSize: props.cardSize/20,
//                         position:'relative',
//                         top:-props.cardSize*473/400,
//                         left:props.cardSize*250/400-badge.name.length*props.cardSize/80,
//                     }}>{badge.name}</div>
//                     <div style={{
//                         width: props.cardSize*80/400,
//                         textAlign: 'right',
//                         fontWeight: 'bold',
//                         fontSize: props.cardSize/30,
//                         position:'relative',
//                         top:-props.cardSize*770/400,
//                         left:props.cardSize*300/400,
//                     }}>
//                         {badge.awardedAt.getMonth()}/{badge.awardedAt.getDate()}/{badge.awardedAt.getFullYear()}
//                     </div>
//                     <div style={{
//                         width: props.cardSize*260/400,
//                         fontWeight: 'bold',
//                         fontSize: props.cardSize/30,
//                         position:'relative',
//                         top:-props.cardSize*480/400,
//                         left:props.cardSize*120/400,
//                     }}>{badge.description}</div>
//                 </div>
//             ))}
//         </>
//     );
// }
// export default BadgeCard;