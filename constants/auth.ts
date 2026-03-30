/**
 * Permission keys following the pattern: resource:action
 * Must match the backend permission definitions.
 */
export const PERMISSIONS = {
  // Users
  USER_READ: "user:read",
  USER_CREATE: "user:create",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",

  // Roles
  ROLE_READ: "role:read",
  ROLE_CREATE: "role:create",
  ROLE_UPDATE: "role:update",
  ROLE_DELETE: "role:delete",

  // Dashboard
  DASHBOARD_VIEW: "dashboard:view",

  // Settings
  SETTING_READ: "setting:read",
  SETTING_UPDATE: "setting:update",
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Role identifiers matching the backend roles enum.
 */
export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
} as const;

export type RoleKey = (typeof ROLES)[keyof typeof ROLES];

/**
 * Routes that do not require authentication.
 */
export const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
] as const;

/**
 * Route prefixes that require authentication.
 */
export const PROTECTED_PREFIXES = [
  "/dashboard",
  "/admin",
  "/settings",
  "/profile",
] as const;
