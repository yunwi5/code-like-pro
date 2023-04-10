import { getForumCategoryPostsData, getForumPostsData } from '@/apis/forum.api';
import { ForumCategory } from '@/models/enums';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { getForumPostsQueryKey } from './keys';

function useForumPostsQuery({
  refetchInterval,
  category = undefined,
}: {
  refetchInterval?: number;
  category?: ForumCategory;
}) {
  const queryClient = useQueryClient();

  const postQueryKey = getForumPostsQueryKey(category);
  const { data, isLoading, error } = useQuery(
    [postQueryKey],
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

  const refetch = () => queryClient.refetchQueries([postQueryKey]);

  return { posts: data, isLoading, error, refetch };
}

export default useForumPostsQuery;
