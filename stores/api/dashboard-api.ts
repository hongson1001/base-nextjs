import { baseApi } from "./base-api";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  orders: number;
  [key: string]: unknown;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useLazyGetDashboardStatsQuery } =
  dashboardApi;
