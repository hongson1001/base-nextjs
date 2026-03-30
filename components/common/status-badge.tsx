"use client";

import { Chip, ChipLabel } from "@heroui/react";

type ChipColor = "default" | "accent" | "success" | "warning" | "danger";

export interface StatusBadgeProps {
  status: string;
  colorMap?: Record<string, ChipColor>;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const defaultColorMap: Record<string, ChipColor> = {
  active: "success",
  inactive: "default",
  pending: "warning",
  error: "danger",
  completed: "success",
  cancelled: "danger",
  draft: "default",
  published: "accent",
};

export function StatusBadge({
  status,
  colorMap,
  size = "sm",
  className,
}: StatusBadgeProps) {
  const map = colorMap ?? defaultColorMap;
  const color = map[status.toLowerCase()] ?? "default";

  return (
    <Chip className={className} color={color} size={size} variant="soft">
      <ChipLabel>{status}</ChipLabel>
    </Chip>
  );
}
