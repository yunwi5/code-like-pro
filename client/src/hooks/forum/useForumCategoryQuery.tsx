import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ForumCategory } from '../../models/enums';
import { getForumPostsForCategory } from '../../apis/forum.api';

function useForumCategoryQuery(category: ForumCategory, refetchInterval: number = 1000) {
    const queryClient = useQueryClient();

    const postQueryKey = `foum-category-${category}`;
    const { data: response, isLoading } = useQuery(
        [postQueryKey],
        () => getForumPostsForCategory(category),
        { refetchInterval },
    );

    const { data: posts, message: error } = response || {};
    if (error) console.log(error);

    const refetch = () => queryClient.refetchQueries([postQueryKey]);

    return { posts, isLoading, error, refetch };
}

export default useForumCategoryQuery;
