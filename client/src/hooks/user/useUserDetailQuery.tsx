import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '../../apis/user.api';

function useUserDetailQuery(userId: string | undefined, refetchInterval?: number) {
    // Fetch user detail with ReactQuery only if the user is authenticated and user state is not null.
    const { data: userDetail, error } = useQuery(
        ['user-detail', { id: userId }],
        () => getUserDetail(userId || '').then((res) => res.data),
        {
            enabled: !!userId,
            refetchInterval,
        },
    );

    if (error) console.log(error);

    return { userDetail };
}

export default useUserDetailQuery;
