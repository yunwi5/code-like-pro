import { useQueryClient } from '@tanstack/react-query';
import { UserDetailProps, patchUserDetail } from '../../../apis/user.api';
import { toastNotify } from '../../../utils/notification.util';
import { IUserDetail } from '../../../models/interfaces';
import { getUserDetailKey } from '../keys';

function useUserDetailMutation(userId: string) {
  const queryClient = useQueryClient();

  const userQueryKey = getUserDetailKey(userId);

  const updateUserDetail = async (userDetailProps: UserDetailProps) => {
    if (!userDetailProps) return;

    // Send some HTTP Request to edit the profile.
    const { ok, data: updatedUser } = await patchUserDetail(userDetailProps);

    if (ok && updatedUser) {
      toastNotify('Profile updated!', 'success');

      // update cache
      queryClient.setQueryData(
        [userQueryKey],
        (oldUserDetail: IUserDetail | undefined) => {
          if (!oldUserDetail) return oldUserDetail;
          return { ...oldUserDetail, ...userDetailProps };
        },
      );
    } else {
      toastNotify('Something went wrong while updating your profile...', 'error');
    }

    refetch();
  };

  const refetch = () => {
    queryClient.refetchQueries([userQueryKey]);
  };

  return { updateUserDetail };
}

export default useUserDetailMutation;
