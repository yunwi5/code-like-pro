import useUserInfoQuery from '../user/useUserInfoQuery';
import useBadgeQuery from './useBadgeQuery';
import { postCreationBadge, postShowcaseBadge, postSolvingBadge } from '../../apis/badge';
import { BadgeCategory, BadgeRarity } from '../../models/enums';
import { useUserContext } from '../../store/context/UserContext';
import { BadgeRarityPoints, notifyBadgeRewards } from '../../utils/badge';

function getRarityOptions(amount: number) {
    if (amount >= 30)
        return [BadgeRarity.UR, BadgeRarity.SR, BadgeRarity.R, BadgeRarity.N];
    if (amount >= 10) return [BadgeRarity.SR, BadgeRarity.R, BadgeRarity.N];
    if (amount >= 5) return [BadgeRarity.R, BadgeRarity.N];
    if (amount >= 1) return [BadgeRarity.N];
    return [];
}

// Inspect the badge qualification of the current user.
function useBadgeQualification() {
    const { userDetail } = useUserContext();
    const { badges, refetch: refetchBadges } = useBadgeQuery(userDetail?._id);
    const { user } = useUserInfoQuery(userDetail?._id, 1000);

    console.log({ user });

    // Inspect creation badge qualification
    const qualifyCreationBadges = async () => {
        const ownedCreationBadges = badges.filter(
            (b) => b.category === BadgeCategory.CREATION,
        );

        const numberOfCreations = user?.createdExercises || 0;
        const possibleRarities = getRarityOptions(numberOfCreations);

        const rewardsList = [];
        for (const rarity of possibleRarities) {
            const existingOne = ownedCreationBadges.find((b) => b.rarity === rarity);
            // If the badge is not awarded yet (though qualified), add it to rewards
            if (!existingOne) {
                rewardsList.push(rarity);
            }
        }
        if (rewardsList.length === 0) return;

        const rewardPromises = rewardsList.map((rarity) => {
            return postCreationBadge(BadgeRarityPoints[rarity]);
        });
        const rewardResponses = await Promise.all(rewardPromises);
        const rewards = rewardResponses.map((res) => res.data);
        console.log('rewards:', rewards);
        refetchBadges();
        notifyBadgeRewards(rewards);
    };

    const qualifySolvingBadges = async () => {
        const ownedSolvingBadges = badges.filter(
            (b) => b.category === BadgeCategory.SOLVING,
        );
        const numberOfSolved = user?.solvedExercises || 0;
        const possibleRarities = getRarityOptions(numberOfSolved);

        const rewardsList = [];
        for (const rarity of possibleRarities) {
            const existingOne = ownedSolvingBadges.find((b) => b.rarity === rarity);
            // If the badge is not awarded yet (though qualified), add it to rewards
            if (!existingOne) {
                rewardsList.push(rarity);
            }
        }
        if (rewardsList.length === 0) return;

        const rewardPromises = rewardsList.map((rarity) => {
            return postSolvingBadge(BadgeRarityPoints[rarity]);
        });
        const rewardResponses = await Promise.all(rewardPromises);
        const rewards = rewardResponses.map((res) => res.data);
        console.log('rewards:', rewards);
        refetchBadges();
        notifyBadgeRewards(rewards);
    };

    const qualifyShowcaseBadges = async () => {
        const ownedShowcaseBadges = badges.filter(
            (b) => b.category === BadgeCategory.SHOWCASE,
        );
        const numberOfShowcases = user?.showCases || 0;
        const possibleRarities = getRarityOptions(numberOfShowcases);

        const rewardsList = [];
        for (const rarity of possibleRarities) {
            const existingOne = ownedShowcaseBadges.find((b) => b.rarity === rarity);
            // If the badge is not awarded yet (though qualified), add it to rewards
            if (!existingOne) {
                rewardsList.push(rarity);
            }
        }
        if (rewardsList.length === 0) return;

        const rewardPromises = rewardsList.map((rarity) => {
            return postShowcaseBadge(BadgeRarityPoints[rarity]);
        });
        const rewardResponses = await Promise.all(rewardPromises);
        const rewards = rewardResponses.map((res) => res.data);
        refetchBadges();
        notifyBadgeRewards(rewards);
    };

    return { qualifyCreationBadges, qualifySolvingBadges, qualifyShowcaseBadges };
}

export default useBadgeQualification;
