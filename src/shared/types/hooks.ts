import { UseQueryResult } from "@tanstack/react-query";

import {
  RequestFunctionParams,
  RequestFunctionResponse,
} from "@/shared/interfaces/hooks";

export type UseQueryHandlerResultType<TData> = UseQueryResult<
  TData,
  unknown
> & {
  data?: TData;
  error?: unknown;
  message?: any;
};

export type RequestFunction = (
  params: RequestFunctionParams,
) => Promise<RequestFunctionResponse>;
