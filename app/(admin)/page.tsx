"use client";

const stats = [
  {
    label: "Total customers",
    value: "567,899",
    change: 2.5,
    trend: "up" as const,
  },
  {
    label: "Total revenue",
    value: "$3,465 M",
    change: 0.5,
    trend: "up" as const,
  },
  {
    label: "Total orders",
    value: "1,136 M",
    change: 0.2,
    trend: "down" as const,
  },
  {
    label: "Total returns",
    value: "1,789",
    change: 0.12,
    trend: "up" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-default-200 bg-background p-5"
          >
            <p className="text-xs font-medium text-default-400">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span
                className={
                  stat.trend === "up"
                    ? "text-xs font-medium text-success"
                    : "text-xs font-medium text-danger"
                }
              >
                {stat.trend === "up" ? "↗" : "↘"} {stat.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Product Sales Chart Placeholder */}
      <div className="rounded-xl border border-default-200 bg-background p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Product sales</h2>
          <div className="flex items-center gap-4 text-sm text-default-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              Gross margin
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-warning" />
              Revenue
            </span>
          </div>
        </div>
        <div className="flex h-64 items-center justify-center rounded-lg bg-default-50 text-default-300">
          Chart component here (recharts, chart.js, etc.)
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Sales by Category */}
        <div className="rounded-xl border border-default-200 bg-background p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Sales by product category
          </h2>
          <div className="flex h-48 items-center justify-center rounded-lg bg-default-50 text-default-300">
            Donut chart here
          </div>
        </div>

        {/* Sales by Country */}
        <div className="rounded-xl border border-default-200 bg-background p-6">
          <h2 className="mb-4 text-lg font-semibold">Sales by countries</h2>
          <div className="flex h-48 items-center justify-center rounded-lg bg-default-50 text-default-300">
            Map / list here
          </div>
        </div>
      </div>
    </div>
  );
}
