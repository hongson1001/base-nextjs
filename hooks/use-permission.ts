"use client";

import { useCallback, useMemo } from "react";

import { useAppSelector } from "@/stores/hooks";

export function usePermission() {
  const user = useAppSelector((state) => state.auth.user);

  const permissions = useMemo(
    () => new Set(user?.permissions ?? []),
    [user?.permissions],
  );

  const roles = useMemo(() => new Set(user?.roles ?? []), [user?.roles]);

  const hasPermission = useCallback(
    (permission: string): boolean => permissions.has(permission),
    [permissions],
  );

  const hasAnyPermission = useCallback(
    (perms: string[]): boolean => perms.some((p) => permissions.has(p)),
    [permissions],
  );

  const hasAllPermissions = useCallback(
    (perms: string[]): boolean => perms.every((p) => permissions.has(p)),
    [permissions],
  );

  const hasRole = useCallback(
    (role: string): boolean => roles.has(role),
    [roles],
  );

  return { hasPermission, hasAnyPermission, hasAllPermissions, hasRole };
}
