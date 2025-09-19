import {useDispatch} from 'react-redux';

import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {HTTP_METHODS} from '@/shared/constants/httpMethods';
import {USER_ERRORS_TYPES} from '@/shared/constants/responses/errors/users';
import {useMutationHandler} from '@/shared/hooks/reactQuery/useMutationHandler';
import {MutationCallbacks} from '@/shared/interfaces/hooks';
import {actions} from '@/shared/redux/slices/users';
import {AppDispatch} from '@/shared/redux/store';
import {setLanguageCookieInBrowser} from '@/shared/utils/localUtils';
import {getQueryClient} from '@/shared/utils/queryClient';
import {resetAllSlices} from '@/shared/utils/resetAllSlices';
import {showToast} from '@/shared/utils/toasts';

const {USERS} = API_ENDPOINTS;
const {POST, PATCH} = HTTP_METHODS;

export const useMutations = () => {
  const queryClient = getQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  return {
    useLoginMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.LOGIN,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({
            data: {user},

            // statusCode,
            // message
          } = {}) => {
            if (user) {
              dispatch(actions.setCurrentUser(user));
            }
            setLanguageCookieInBrowser({language: user.language});
          },
          onErrorAlways: ({error: {type}, message, statusCode}) => {
            if (type === USER_ERRORS_TYPES.wrongEmailOrPassword.value) {
              showToast({type: 'error', message});
            }
          },
        },
      }),

    useSignupMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.SIGNUP,
        method: POST,
        callBackFuncs,
      }),

    useResetPasswordMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.RESET_PASSWORD,
        method: POST,
        callBackFuncs,
      }),

    useResendVerificationMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.RESEND_VERIFICATION,
        method: POST,
        callBackFuncs,
      }),

    useVerifyUserMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.VERIFY,
        method: POST,
        callBackFuncs,
      }),

    useSendResetPasswordMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.SEND_RESET_PASSWORD,
        method: POST,
        callBackFuncs,
      }),

    useSignOutMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.LOGOUT,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: () => {
            queryClient.removeQueries();
            dispatch(resetAllSlices());
          },
        },
      }),

    useUpdateLanguageMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.UPDATE_USER_LANGUAGE,
        method: PATCH,
        callBackFuncs,
      }),
  };
};
