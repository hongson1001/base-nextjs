"use client";

import { useGetDashboardStatsQuery } from "@/stores/api/dashboard-api";

export default function DashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Users",
            value: stats?.totalUsers?.toLocaleString() ?? "0",
          },
          {
            title: "Active Users",
            value: stats?.activeUsers?.toLocaleString() ?? "0",
          },
          {
            title: "Revenue",
            value: `$${(stats?.revenue ?? 0).toLocaleString()}`,
          },
          {
            title: "Orders",
            value: stats?.orders?.toLocaleString() ?? "0",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-default-200 bg-content1 p-4 shadow-sm"
          >
            <p className="text-sm text-default-500">{item.title}</p>
            <p className="mt-1 text-2xl font-semibold">
              {isLoading ? "..." : item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
