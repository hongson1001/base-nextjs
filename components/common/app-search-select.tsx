"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import { Label } from "react-aria-components";

export interface SearchSelectOption {
  key: string;
  label: string;
}

export interface AppSearchSelectProps {
  label?: string;
  placeholder?: string;
  options: SearchSelectOption[];
  value?: string;
  onChange?: (key: string | null) => void;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
}

export function AppSearchSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  isDisabled,
  isRequired,
  className,
}: AppSearchSelectProps) {
  const [filter, setFilter] = useState("");

  const filteredOptions = useMemo(() => {
    if (!filter) return options;
    const lower = filter.toLowerCase();

    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, filter]);

  return (
    <Select
      className={className}
      defaultSelectedKey={value}
      isDisabled={isDisabled}
      isInvalid={!!error}
      isRequired={isRequired}
      onSelectionChange={(key) => onChange?.(key as string | null)}
    >
      {label && (
        <Label className="text-sm font-medium text-default-700">{label}</Label>
      )}
      <SelectTrigger>
        <SelectValue>
          {({ defaultChildren }) =>
            defaultChildren || placeholder || "Select..."
          }
        </SelectValue>
      </SelectTrigger>
      <SelectPopover>
        <div className="p-2 border-b border-divider">
          <input
            className="w-full rounded-md bg-default-100 px-3 py-1.5 text-sm outline-none"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <ListBox>
          {filteredOptions.map((option) => (
            <ListBoxItem key={option.key} id={option.key}>
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </SelectPopover>
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </Select>
  );
}
