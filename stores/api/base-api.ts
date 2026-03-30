import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

interface ApiEnvelope<T = unknown> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
  errors?: unknown;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    // Session-cookie mode: credentials:'include' handles cookies automatically.
    // For JWT mode you could read from localStorage here:
    // const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    // if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    // On 401 you could attempt a silent refresh here:
    // if (result.error.status === 401) {
    //   const refresh = await rawBaseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);
    //   if ((refresh.data as ApiEnvelope)?.success) {
    //     return await rawBaseQuery(args, api, extraOptions);
    //   }
    // }
    return result;
  }

  // Unwrap the API envelope
  const envelope = result.data as ApiEnvelope;

  if (!envelope.success) {
    return {
      error: {
        status: (result.meta?.response?.status as number) ?? 400,
        data: envelope.errors,
      } as FetchBaseQueryError,
    };
  }

  return {
    data: envelope.data,
    meta: envelope.meta as Record<string, unknown> | undefined,
  };
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Auth", "User", "Dashboard"],
  endpoints: () => ({}),
});
