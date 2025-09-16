import { useMutation } from "@tanstack/react-query";

import { MutationVariables, RequestParams } from "@/shared/interfaces/hooks";
import { RequestFunction } from "@/shared/types/hooks";
import {
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
} from "@/shared/utils/requests";

const requestFunctions: Record<RequestParams["method"], RequestFunction> = {
  POST: postRequest,
  PUT: putRequest,
  PATCH: patchRequest,
  DELETE: deleteRequest,
};

export const useMutationHandler = ({
  endpoint,
  method,
  isThirdParty = false,
  callBackFuncs = {},
}: RequestParams) => {
  const { onSuccessAlways, onErrorAlways, onSuccess, onError } = callBackFuncs;

  const requestFunction =
    requestFunctions[method.toUpperCase() as RequestParams["method"]];

  if (!requestFunction) {
    throw new Error(
      `Invalid method: ${method}. Use POST, PUT, PATCH, or DELETE.`,
    );
  }

  const mutation = useMutation<any, any, MutationVariables>({
    mutationFn: async (variables?: MutationVariables | undefined) => {
      const { payload, params } = variables || {};
      try {
        const apiEndpoint =
          typeof endpoint === "function" ? endpoint(params) : endpoint;

        const response = await requestFunction({
          endpoint: apiEndpoint,
          payload,
        });

        if (isThirdParty) {
          // Return the entire body as-is for third-party configs (Stripe, etc.)
          onSuccessAlways?.(response.data);
          onSuccess?.(response.data);

          return response.data;
        }

        const { body, ...rest } = response.data;
        const res = { data: body, ...rest };
        onSuccessAlways?.(res);
        onSuccess?.(res);

        return res;
      } catch (err) {
        onErrorAlways?.(err);
        onError?.(err);
        throw err;
      }
    },
  });

  const { data, error, ...rest } = mutation;

  return {
    ...data,
    ...error,
    ...rest,
  };
};
