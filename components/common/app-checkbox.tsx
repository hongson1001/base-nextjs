"use client";

import { type ComponentPropsWithRef, type ReactNode } from "react";
import { Checkbox, CheckboxControl, CheckboxIndicator } from "@heroui/react";

export interface AppCheckboxProps
  extends Omit<ComponentPropsWithRef<typeof Checkbox>, "children"> {
  label?: string;
  children?: ReactNode;
}

export function AppCheckbox({ label, children, ...props }: AppCheckboxProps) {
  return (
    <Checkbox {...props}>
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
      {(label || children) && (
        <span className="text-sm">{label || children}</span>
      )}
    </Checkbox>
  );
}
