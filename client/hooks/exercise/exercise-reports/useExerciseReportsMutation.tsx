import { useQueryClient } from '@tanstack/react-query';
import useListQueryCacheUpdate from '../../cache/useListQueryCacheUpdate';
import { ReportProps, postExerciseReport } from '../../../apis/exercise.api';
import { toastNotify } from '../../../utils/notification.util';
import { getExerciseReportsKey } from '../keys';

function useExerciseReportsMutation(exerciseId: string | undefined) {
  const queryClient = useQueryClient();

  const reportsQueryKey = getExerciseReportsKey(exerciseId || '');
  const { addItemToCache, updateItemInCache } = useListQueryCacheUpdate(reportsQueryKey);

  const postReport = async (reportProps: ReportProps): Promise<string | undefined> => {
    if (!exerciseId) return undefined;

    const {
      ok,
      message,
      status,
      data: newReport,
    } = await postExerciseReport(exerciseId, reportProps);

    if (ok) {
      toastNotify('Sending report successful!', 'success');

      if (status === 201) {
        addItemToCache(newReport);
      } else if (status === 200) {
        updateItemInCache(newReport);
      }
    } else {
      toastNotify(`Sorry there is an error: ${message}.`, 'error');
    }
    refetch();

    return message;
  };

  const refetch = () => queryClient.refetchQueries([reportsQueryKey]);

  return { postReport };
}

export default useExerciseReportsMutation;
