import { USERS } from "@/shared/constants/reactQueryConstants";
import { useQueryHandler } from "@/shared/hooks/reactQuery/useQueryHandler";
import { QueryCallbacks } from "@/shared/interfaces/hooks";

export const useQueries = () => {
  return {
    // Function to fetch the logged-in user info
    useFetchLoginUserInfo: ({
      callBackFuncs,
    }: { callBackFuncs?: QueryCallbacks } = {}) =>
      useQueryHandler({
        queryKey: USERS.fetchLoginUserInfo.queryKey,
        endpoint: USERS.fetchLoginUserInfo.endpoint,
        callbacks: {
          ...callBackFuncs,
          onSuccessAlways: ({
            // data,
            // statusCode,
            // message
          } = {}) => {},
          onErrorAlways: (
            {
              // error : {type},
              // message,
              // statusCode
            },
          ) => {},
        },
      }),

    // Function to fetch the list of users
    useFetchAllUsersList: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.fetchAllUsersList.queryKey,
        endpoint: USERS.fetchAllUsersList.endpoint({ params }),
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
