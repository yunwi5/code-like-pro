import useUserInfoQuery from '../user/useUserInfoQuery';
import useBadgeQuery from './useBadgeQuery';
import {
    postCreationBadge,
    postShowcaseBadge,
    postSolvingBadge,
} from '../../apis/badge.api';
import { BadgeCategory, BadgeRarity } from '../../models/enums';
import { useUserContext } from '../../store/context/UserContext';
import {
    BadgeRarityPoints,
    notifyBadgeRewards,
    RARITY_N_CUT,
    RARITY_R_CUT,
    RARITY_SR_CUT,
    RARITY_UR_CUT,
} from '../../utils/badge';
import { useCallback } from 'react';

// Get possible list of rewardable rarities based on the amount
function getRarityOptions(amount: number) {
    if (amount >= RARITY_UR_CUT)
        return [BadgeRarity.UR, BadgeRarity.SR, BadgeRarity.R, BadgeRarity.N];
    if (amount >= RARITY_SR_CUT) return [BadgeRarity.SR, BadgeRarity.R, BadgeRarity.N];
    if (amount >= RARITY_R_CUT) return [BadgeRarity.R, BadgeRarity.N];
    if (amount >= RARITY_N_CUT) return [BadgeRarity.N];
    return [];
}

// Inspect the badge qualification of the current user.
function useBadgeQualification() {
    const { userDetail } = useUserContext();
    const { badges, refetch: refetchBadges } = useBadgeQuery(userDetail?._id);
    const { user } = useUserInfoQuery(userDetail?._id, 1000);

    // Inspect creation badge qualification
    const qualifyCreationBadges = useCallback(async () => {
        const ownedCreationBadges = badges.filter(
            (b) => b.category === BadgeCategory.CREATION,
        );

        const numberOfCreations = user?.createdExercises || 0;
        const possibleRarities = getRarityOptions(numberOfCreations);

        const rewardsList = [];
        for (const rarity of possibleRarities) {
            const existingOne = ownedCreationBadges.find((b) => b.rarity === rarity);
            // If the badge is not awarded yet (though qualified), add it to rewards
            if (!existingOne) rewardsList.push(rarity);
        }
        if (rewardsList.length === 0) return;

        const rewardPromises = rewardsList.map((rarity) => {
            return postCreationBadge(BadgeRarityPoints[rarity]);
        });

        const rewardResponses = await Promise.all(rewardPromises);
        const rewards = rewardResponses.map((res) => res.data);
        // console.log('rewards:', rewards);
        refetchBadges();
        notifyBadgeRewards(rewards);
    }, [badges, user, refetchBadges]);

    const qualifySolvingBadges = useCallback(async () => {
        const ownedSolvingBadges = badges.filter(
            (b) => b.category === BadgeCategory.SOLVING,
        );
        const numberOfSolved = user?.solvedExercises || 0;
        const possibleRarities = getRarityOptions(numberOfSolved);

        const rewardsList = [];
        for (const rarity of possibleRarities) {
            const existingOne = ownedSolvingBadges.find((b) => b.rarity === rarity);
            // If the badge is not awarded yet (though qualified), add it to rewards
            if (!existingOne) rewardsList.push(rarity);
        }
        if (rewardsList.length === 0) return;

        const rewardPromises = rewardsList.map((rarity) => {
            return postSolvingBadge(BadgeRarityPoints[rarity]);
        });
        const rewardResponses = await Promise.all(rewardPromises);
        const rewards = rewardResponses.map((res) => res.data);
        // console.log('rewards:', rewards);
        refetchBadges();
        notifyBadgeRewards(rewards);
    }, [badges, user, refetchBadges]);

    const qualifyShowcaseBadges = useCallback(async () => {
        const ownedShowcaseBadges = badges.filter(
            (b) => b.category === BadgeCategory.SHOWCASE,
        );
        const numberOfShowcases = user?.showCases || 0;
        const possibleRarities = getRarityOptions(numberOfShowcases);

        const rewardsList = [];
        for (const rarity of possibleRarities) {
            const existingOne = ownedShowcaseBadges.find((b) => b.rarity === rarity);
            // If the badge is not awarded yet (though qualified), add it to rewards
            if (!existingOne) rewardsList.push(rarity);
        }
        if (rewardsList.length === 0) return;

        const rewardPromises = rewardsList.map((rarity) =>
            postShowcaseBadge(BadgeRarityPoints[rarity]),
        );
        const rewardResponses = await Promise.all(rewardPromises);
        const rewards = rewardResponses.map((res) => res.data);
        refetchBadges();
        notifyBadgeRewards(rewards);
    }, [badges, user, refetchBadges]);

    return { qualifyCreationBadges, qualifySolvingBadges, qualifyShowcaseBadges };
}

export default useBadgeQualification;
