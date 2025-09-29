export const API_ENDPOINTS = {
  USERS: {
    LOGIN: '/users/login',
    SIGNUP: '/users/signup',
    RESEND_VERIFICATION: '/users/verify/refresh',
    VERIFY: ({token}: {token: string}) => `/users/verify/new/${token}`,
    SEND_RESET_PASSWORD: '/users/forgot-password',
    RESET_PASSWORD: ({token}: {token: string}) => `/users/reset/${token}`,
    LOGOUT: '/users/logout',
    GET_USERS_LIST: '/users/',
    GET_LOGIN_USER: '/users/me',
    UPDATE_USER_LANGUAGE: '/users/language',
  },

  TASKS: {
    GET_TASKS_LIST: '/tasks/',
  },
};
