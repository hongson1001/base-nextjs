"use client";

import { Card, CardContent } from "@heroui/react";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  trend?: "up" | "down";
}

export function StatCard({ title, value, icon, change, trend }: StatCardProps) {
  const trendColor = trend === "up" ? "text-success" : "text-danger";
  const trendArrow = trend === "up" ? "\u2191" : "\u2193";

  return (
    <Card className="w-full">
      <CardContent className="flex flex-row items-center gap-4 p-5">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-default-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        {change !== undefined && trend && (
          <div className={`text-sm font-medium ${trendColor}`}>
            {trendArrow} {Math.abs(change)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}
