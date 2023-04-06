import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ForumCategory } from '../../models/enums';
import { getForumPostsForCategory } from '../../apis/forum.api';
import { getForumPostCategoryKey } from './keys';

function useForumCategoryQuery(category: ForumCategory, refetchInterval: number = 1000) {
    const queryClient = useQueryClient();

    const postCategoryQueryKey = getForumPostCategoryKey(category);
    const { data: response, isLoading } = useQuery(
        [postCategoryQueryKey],
        () => getForumPostsForCategory(category),
        { refetchInterval },
    );

    const { data: posts, message: error } = response || {};
    if (error) console.log(error);

    const refetch = () => queryClient.refetchQueries([postCategoryQueryKey]);

    return { posts, isLoading, error, refetch };
}

export default useForumCategoryQuery;
