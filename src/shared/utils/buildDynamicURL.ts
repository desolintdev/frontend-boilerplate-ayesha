import { BuildDynamicUrlArgs } from "@/shared/types/utils";

export const buildDynamicURL = ({
  baseEndpoint,
  params,
}: BuildDynamicUrlArgs): string => {
  const { search = "", sort = "", number = 0, limit } = params || {};
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (sort) queryParams.append("sort", sort);
  if (number > 0) queryParams.append("page", number.toString());
  if (limit) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();

  return queryString ? `${baseEndpoint}?${queryString}` : baseEndpoint;
};
