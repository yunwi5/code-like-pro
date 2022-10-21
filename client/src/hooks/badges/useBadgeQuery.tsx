import { useQuery } from '@tanstack/react-query';
import { getBadges } from '../../apis/badge';

function useBadgeQuery(userId: string | undefined) {
    const { isLoading, data: response } = useQuery(
        ['badges', userId],
        () => getBadges(userId || ''),
        {
            refetchOnWindowFocus: true, // refetch whenever the user focuses on the window.
            enabled: !!userId,
        },
    );

    const { data: badges, message: error } = response || {};

    if (error) console.log(error);

    return { isLoading, badges, error };
}

export default useBadgeQuery;
