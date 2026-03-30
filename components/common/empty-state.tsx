"use client";

import { Button } from "@heroui/react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-default-300">{icon}</div>}
      <h3 className="text-lg font-semibold text-default-700">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-default-500">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button className="mt-4" variant="primary" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
