"use client";

import { useCallback, useMemo, useState } from "react";

export function useTableSelection() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const toggleAll = useCallback((ids: string[]) => {
    setSelectedIds((prev) => {
      const allSelected = ids.every((id) => prev.has(id));

      if (allSelected) {
        // Deselect all provided ids
        const next = new Set(prev);

        ids.forEach((id) => next.delete(id));

        return next;
      }

      // Select all provided ids
      const next = new Set(prev);

      ids.forEach((id) => next.add(id));

      return next;
    });
  }, []);

  const isSelected = useCallback(
    (id: string): boolean => selectedIds.has(id),
    [selectedIds],
  );

  const clear = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectedCount = useMemo(() => selectedIds.size, [selectedIds]);

  return {
    selectedIds,
    toggle,
    toggleAll,
    isSelected,
    clear,
    selectedCount,
  };
}
