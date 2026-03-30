"use client";

import { type ComponentPropsWithRef, type ReactNode } from "react";
import { Button, Spinner } from "@heroui/react";

import { usePermission } from "@/hooks/use-permission";

export interface AppButtonProps
  extends Omit<ComponentPropsWithRef<typeof Button>, "children"> {
  permission?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

export function AppButton({
  permission,
  isLoading,
  isDisabled,
  children,
  ...props
}: AppButtonProps) {
  const { hasPermission } = usePermission();

  if (permission && !hasPermission(permission)) {
    return null;
  }

  return (
    <Button isDisabled={isDisabled || isLoading} {...props}>
      {isLoading && <Spinner className="mr-2" size="sm" />}
      {children}
    </Button>
  );
}
