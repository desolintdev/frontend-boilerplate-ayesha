import {TASKS} from '@/shared/constants/reactQueryConstants';
import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {QueryCallbacks} from '@/shared/interfaces/hooks';
import {showToast} from '@/shared/utils/toasts';

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

    // Fetch task by ID
    useFetchTaskById: ({
      callBackFuncs,
      id,
    }: {
      callBackFuncs?: QueryCallbacks;
      id: string;
    }) =>
      useQueryHandler({
        queryKey: TASKS.fetchTaskById.queryKey,
        endpoint: TASKS.fetchTaskById.endpoint({id}),
        params: {id},
        customQueryOptions: {
          staleTime: 0,
          gcTime: 0,
          refetchOnMount: true,
          refetchOnReconnect: true,
        },
        callbacks: {
          ...callBackFuncs,
          onErrorAlways: (error) =>
            showToast({type: 'error', message: error.message}),
        },
      }),
  };
};
