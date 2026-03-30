"use client";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { useGetDashboardStatsQuery } from "@/stores/api/dashboard-api";

export default function DashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  return (
    <div>
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          change={12}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Total Users"
          trend="up"
          value={
            isLoading ? "..." : (stats?.totalUsers?.toLocaleString() ?? "0")
          }
        />
        <StatCard
          change={8}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Active Users"
          trend="up"
          value={
            isLoading ? "..." : (stats?.activeUsers?.toLocaleString() ?? "0")
          }
        />
        <StatCard
          change={23}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Revenue"
          trend="up"
          value={
            isLoading ? "..." : `$${(stats?.revenue ?? 0).toLocaleString()}`
          }
        />
        <StatCard
          change={3}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Orders"
          trend="down"
          value={isLoading ? "..." : (stats?.orders?.toLocaleString() ?? "0")}
        />
      </div>
    </div>
  );
}
