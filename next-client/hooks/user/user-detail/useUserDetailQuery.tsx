import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserDetail } from '../../../apis/user.api';
import { getUserDetailKey } from '../keys';

function useUserDetailQuery(userId: string | undefined, refetchInterval?: number) {
  const queryClient = useQueryClient();

  const userQueryKey = getUserDetailKey(userId || '');

  // Fetch user detail with ReactQuery only if the user is authenticated and user state is not null.
  const { data: userDetail, error } = useQuery(
    [userQueryKey],
    () => getUserDetail(userId || '').then((res) => res.data),
    {
      enabled: !!userId,
      refetchInterval,
    },
  );

  const refetchDetail = () => {
    queryClient.refetchQueries([userQueryKey]);
  };

  if (error) console.log(error);

  return { userDetail, refetch: refetchDetail };
}

export default useUserDetailQuery;
