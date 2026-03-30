"use client";

import { useEffect } from "react";

import { useSocket } from "./use-socket";

import { useAppDispatch } from "@/stores/hooks";
import { baseApi } from "@/stores/api/base-api";

/**
 * Maps entity URL path segments to their corresponding RTK Query cache tag.
 * When a socket event signals a change to an entity, we look up the tag here.
 */
const ENTITY_TAG_MAP: Record<string, string> = {
  users: "User",
  auth: "Auth",
  dashboard: "Dashboard",
  // Add more mappings as your API grows:
  // products: "Product",
  // orders: "Order",
};

/**
 * When a tag is invalidated, these related tags are also invalidated.
 * Useful for cascading updates (e.g. changing a user also affects the dashboard).
 */
const RELATED_TAGS: Record<string, string[]> = {
  User: ["Dashboard"],
  // Order: ["Dashboard", "Product"],
};

interface EntityChangedPayload {
  entity: string;
  action: "created" | "updated" | "deleted";
  id?: string;
}

/**
 * The most important hook: listens to socket events and automatically
 * invalidates RTK Query cache tags so the UI stays in sync with the server.
 */
export function useRealtimeSync() {
  const dispatch = useAppDispatch();
  const { on, off } = useSocket();

  useEffect(() => {
    const handleEntityChanged = (payload: EntityChangedPayload) => {
      const tag = ENTITY_TAG_MAP[payload.entity];

      if (!tag) return;

      // Collect all tags to invalidate
      const tagsToInvalidate: string[] = [tag];
      const related = RELATED_TAGS[tag];

      if (related) {
        tagsToInvalidate.push(...related);
      }

      // Build the invalidation payload — invalidate by tag type
      const invalidations = tagsToInvalidate.map((t) => ({
        type: t as "Auth" | "User" | "Dashboard",
      }));

      dispatch(baseApi.util.invalidateTags(invalidations));
    };

    const handleDashboardUpdate = () => {
      dispatch(baseApi.util.invalidateTags([{ type: "Dashboard" }]));
    };

    const handleNotificationNew = (notification: unknown) => {
      // You can integrate with a toast library here, e.g.:
      // toast.info((notification as { message: string }).message);
      if (typeof window !== "undefined") {
        const event = new CustomEvent("notification:new", {
          detail: notification,
        });

        window.dispatchEvent(event);
      }
    };

    on("entity:changed", handleEntityChanged as (...args: unknown[]) => void);
    on(
      "dashboard:update",
      handleDashboardUpdate as (...args: unknown[]) => void,
    );
    on(
      "notification:new",
      handleNotificationNew as (...args: unknown[]) => void,
    );

    return () => {
      off(
        "entity:changed",
        handleEntityChanged as (...args: unknown[]) => void,
      );
      off(
        "dashboard:update",
        handleDashboardUpdate as (...args: unknown[]) => void,
      );
      off(
        "notification:new",
        handleNotificationNew as (...args: unknown[]) => void,
      );
    };
  }, [dispatch, on, off]);
}
