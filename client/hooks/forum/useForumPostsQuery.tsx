import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getForumCategoryPostsData, getForumPostsData } from '@/apis/forum.api';
import { ForumCategory } from '@/models/enums';

import { getForumPostsQueryKey } from './keys';

function useForumPostsQuery({
  refetchInterval,
  category = undefined,
}: {
  refetchInterval?: number;
  category?: ForumCategory;
}) {
  const queryClient = useQueryClient();

  const forumPostsQueryKey = getForumPostsQueryKey(category);
  const { data, isLoading, error } = useQuery(
    [forumPostsQueryKey],
    () => {
      if (category == null) return getForumPostsData({ catchErrors: false });
      return getForumCategoryPostsData(category, { catchErrors: false });
    },
    {
      refetchInterval,
      refetchOnWindowFocus: true,
    },
  );

  if (error) console.log(error);

  const refetch = () => queryClient.refetchQueries([forumPostsQueryKey]);

  return { posts: data, isLoading, error, refetch };
}

export default useForumPostsQuery;
