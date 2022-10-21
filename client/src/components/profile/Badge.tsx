import React, {useEffect, useState, useRef} from 'react';
import PageNavigation from '../ui/PageNavigation';
import usePagination from '../../hooks/usePagination';
import BadgeN from '../../assets/badgeImages/BadgeN.png';
import BadgeR from '../../assets/badgeImages/BadgeR.png';
import BadgeSR from '../../assets/badgeImages/BadgeSR.png';
import BadgeUR from '../../assets/badgeImages/BadgeUR.png';
import { IBadge } from '../../models/interfaces';
import BadgeCard from './BadgeCard';
import { getBadges } from '../../apis/badge';
import { useUserContext } from '../../store/context/UserContext';

const badgesPerRow = 4;
const maximumRows = 1;
const rarityOrder = ['N','R','SR','UR'];

// // Fixed array.
// const d1 = new Date(2022,10,21,10,0,0,0);
//                 const d2 = new Date(2023,5,21,10,0,0,0);
//                 const d3 = new Date(2022,5,21,10,0,0,0);
//                 const d4 = new Date(2022,9,21,10,0,0,0);
// const fixedArray = [
//     { 'rarity': 'UR', 'name': 'Solve 100+ Exercises', 'description': 'This is a fixed data of UR card.', 'awardedAt': d1,'category':'ur'}, 
//     { 'rarity': 'SR', 'name': 'Solve 30+ Exercises', 'description': 'This is a fixed data of SR card, and this is also the test for a very long text length.', 'awardedAt': d2, 'category':'sr'}, 
//     { 'rarity': 'R', 'name': 'Solve 10+ Exercises', 'description': 'This is a fixed data of R card.', 'awardedAt': d3, 'category':'r'},
//     { 'rarity': 'N', 'name': 'Solve 1+ Exercises', 'description': 'This is a fixed data of N card.', 'awardedAt': d4, 'category':'n'},
// ];

function convertDate(d : Date){
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const month = months[d.getMonth()];
    const day = (d.getDate()%10==1)?'st':(d.getDate()%10==2)?'nd':(d.getDate()%10==3)?'rd':'th';
    return month + ' ' + d.getDate() + day + ', ' + d.getFullYear();
}

const Badge: React.FC = () => {
    const { userDetail } = useUserContext();
    const para: IBadge[] = [];
    let [badgeArray, setBadge] = useState(para);
    let [orderMode, setOrder] = useState('');
    let [currentBadge, setCurrentBadge] = useState(para);
    // GET Badges.
    let userId = userDetail?._id || 'null';
    useEffect(() => {
        if (userId == 'null'){return;}
        getBadges(userId).then((res) => {
            if (res.ok && res.data) {
                setBadge(res.data.sort((a,b) => a.name < b.name?-1:1));
                setOrder('titleAtoZ');
            }
        });
    }, [userId]);

    const buttonStyle = {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
    }
    let {array: badges,page,setPage,maxPage,} = usePagination({ array: badgeArray, itemPerPage: badgesPerRow * maximumRows });
    const badgeSize = 200;
    const badgePadding = 10;
    const infoBoxHeight = 20;
    const badgeBoxWidth = badgeSize * badgesPerRow;
    const badgeBoxHeight = badgeSize * maximumRows + infoBoxHeight*2 + (maximumRows-1)*14; //Fixed value added for line break.
    return (
        <>
            <div className='inline-block m-5'>
                <div className='text-2xl text-grey-600 mb-4'>Rewarded Badges</div>
                <div>
                    <button onClick={()=>{
                        setBadge(()=>{return badgeArray.sort((a,b)=>a.name < b.name?-1:1);});
                        setOrder('titleAtoZ');
                    }} className={(orderMode=='titleAtoZ')?'text-main-400':'text-grey-400'}style={buttonStyle}>Title A-Z</button>
                    <button onClick={()=>{
                        setBadge(()=>{return badgeArray.sort((a,b)=>a.awardedAt.getTime() > b.awardedAt.getTime()?-1:1);});
                        setOrder('mostRecent');
                    }} className={(orderMode=='mostRecent')?'text-main-400':'text-grey-400'}style={buttonStyle}>Most Recent</button>
                    <button onClick={()=>{
                        setBadge(()=>{return badgeArray.sort((a,b)=>rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)?1:-1);});
                        setOrder('rarest');
                    }} className={(orderMode=='rarest')?'text-main-400':'text-grey-400'}style={buttonStyle}>Rarest</button>
                    <span className='text-grey-400 float-right'>{badgeArray.length} Badges</span>
                </div>
                <div style={{ width: badgeBoxWidth, height: badgeBoxHeight}} className='mt-4'>
                    {badgeArray.map((badge, index) => (
                        (index >= page * badgesPerRow * maximumRows && index < (page+1) * badgesPerRow * maximumRows) ?
                        <div style={{width: badgeSize, height: badgeSize, padding: badgePadding}} className='inline-block' key={'badge'+index.toString()}>
                            {(badge.rarity=='UR')}
                            <img onClick={()=>{
                                setCurrentBadge([badge]);
                            }} 
                            src={(badge.rarity=='UR')?BadgeUR:(badge.rarity=='SR')?BadgeSR:(badge.rarity=='R')?BadgeR:BadgeN} 
                            className={'shadow rounded-lg hover:bg-grey-200'}/>
                            <div style={{height:infoBoxHeight,textAlign:'center',fontWeight:'bold'}} className='text-main-400'>{badge.name}</div>
                            <div style={{height:infoBoxHeight,textAlign:'center',fontSize:10}}>{convertDate(badge.awardedAt)}</div>
                        </div>
                        :''
                    ))}
                </div>
                <div style={{width:badgeBoxWidth/2}} className='mt-10'>
                    <BadgeCard currentBadge = {currentBadge} cardSize = {badgeBoxWidth}/>
                </div>
                <div style={{ width: badgeBoxWidth }} className="mt-10 scale-75 inline-block item-center">
                    <PageNavigation
                        currentPage={page}
                        totalPages={maxPage}
                        onChangePage={(newPage: number) => setPage(newPage)}
                    />
                </div>
            </div>
            {/* <button onClick={()=>{
                setBadge(fixedArray.sort((a,b)=>a.name<b.name?-1:1));
                setOrder('titleAtoZ');
            }}>{userDetail?._id}</button> */}
        </>
    );
};
export default Badge;