import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserDetail } from '../../apis/user.api';

function useUserDetailQuery(userId: string | undefined, refetchInterval?: number) {
    const queryClient = useQueryClient();

    // Fetch user detail with ReactQuery only if the user is authenticated and user state is not null.
    const { data: userDetail, error } = useQuery(
        ['user-detail', { id: userId }],
        () => getUserDetail(userId || '').then((res) => res.data),
        {
            enabled: !!userId,
            refetchInterval,
        },
    );

    const refetchDetail = () => {
        queryClient.refetchQueries([['user-detail', { id: userId }]]);
    };

    if (error) console.log(error);

    return { userDetail, refetch: refetchDetail };
}

export default useUserDetailQuery;
