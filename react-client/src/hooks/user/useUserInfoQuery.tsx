import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../apis/user.api';

function useUserInfoQuery(userId: string | undefined, refetchInterval?: number) {
    // Fetch user detail with ReactQuery only if the user is authenticated and user state is not null.
    const { data: user, error } = useQuery(
        ['user-info', { id: userId }],
        () => getUserInfo(userId || '').then((res) => res.data),
        {
            enabled: !!userId,
            refetchInterval,
        },
    );

    if (error) console.log(error);

    return { user };
}

export default useUserInfoQuery;
