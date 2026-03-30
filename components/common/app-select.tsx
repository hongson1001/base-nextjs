"use client";

import { type ComponentPropsWithRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopover,
} from "@heroui/react";
import { Label } from "react-aria-components";

export interface AppSelectProps
  extends Omit<ComponentPropsWithRef<typeof Select>, "children"> {
  label?: string;
  error?: string;
  placeholder?: string;
  children: React.ReactNode;
}

export function AppSelect({
  label,
  error,
  placeholder,
  children,
  className,
  ...props
}: AppSelectProps) {
  return (
    <Select className={className} isInvalid={!!error} {...props}>
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
      <SelectPopover>{children}</SelectPopover>
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </Select>
  );
}
