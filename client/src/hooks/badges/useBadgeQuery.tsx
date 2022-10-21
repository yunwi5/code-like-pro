import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBadges } from '../../apis/badge.api';
import { IBadge } from '../../models/interfaces';

function useBadgeQuery(userId: string | undefined) {
    const queryClient = useQueryClient();

    const { isLoading, data: response } = useQuery(
        ['badges', userId],
        () => getBadges(userId || ''),
        {
            refetchOnWindowFocus: true, // refetch whenever the user focuses on the window.
            enabled: !!userId,
        },
    );

    const { data: badges = [], message: error } = response || {};

    const processedBadges = useMemo(() => {
        const noDuplicates: IBadge[] = [];
        for (const badge of badges) {
            if (
                !noDuplicates.find(
                    (b) => b.rarity === badge.rarity && b.category === badge.category,
                )
            ) {
                noDuplicates.push(badge);
            }
        }
        return noDuplicates;
    }, [badges]);

    // Refetch data of the query key
    const refetch = () => queryClient.refetchQueries(['badges', userId]);

    if (error) console.log(error);

    return { isLoading, refetch, badges: processedBadges, error };
}

export default useBadgeQuery;
