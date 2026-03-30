"use client";

import { Button } from "@heroui/react";

import { SearchInput } from "./search-input";

export interface TableToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onFilterToggle?: () => void;
  showFilter?: boolean;
  bulkActions?: React.ReactNode;
  createLabel?: string;
  onCreatePress?: () => void;
  children?: React.ReactNode;
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  onFilterToggle,
  showFilter,
  bulkActions,
  createLabel,
  onCreatePress,
  children,
}: TableToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <SearchInput
          className="w-64"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex items-center gap-2">
        {bulkActions}
        {onFilterToggle && (
          <Button
            size="sm"
            variant={showFilter ? "primary" : "tertiary"}
            onPress={onFilterToggle}
          >
            Filters
          </Button>
        )}
        {children}
        {createLabel && onCreatePress && (
          <Button size="sm" variant="primary" onPress={onCreatePress}>
            {createLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
