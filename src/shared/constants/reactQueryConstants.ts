import { buildDynamicURL } from "@/shared/utils/buildDynamicURL";

import { API_ENDPOINTS } from "./apiEndpoints";

export const FILTERS_CONFIG = {
  number: 1,
  limit: 5,
  search: "",
  sortBy: "",
  sortDir: "",
};

export const USERS = {
  fetchLoginUserInfo: {
    queryKey: "getLoginUser",
    endpoint: API_ENDPOINTS.USERS.GET_LOGIN_USER,
  },
  fetchAllUsersList: {
    queryKey: "getUsersList",
    endpoint: ({ params }: { params: any }) =>
      buildDynamicURL({
        baseEndpoint: API_ENDPOINTS.USERS.GET_USERS_LIST,
        params,
      }),
    activeServerSidePagination: true,
  },
};
