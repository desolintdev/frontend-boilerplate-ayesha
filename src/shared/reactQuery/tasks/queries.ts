import {TASKS} from '@/shared/constants/reactQueryConstants';
import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {QueryCallbacks} from '@/shared/interfaces/hooks';

export const taskQueries = () => {
  return {
    // Function to fetch all tasks
    useFetchAllTasksList: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: TASKS.fetchAllTasksList.queryKey,
        endpoint: TASKS.fetchAllTasksList.endpoint({params}),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),
  };
};
