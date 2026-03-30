"use client";

import { type ComponentPropsWithRef, type ReactNode } from "react";
import { Switch, SwitchControl, SwitchThumb } from "@heroui/react";

export interface AppSwitchProps
  extends Omit<ComponentPropsWithRef<typeof Switch>, "children"> {
  label?: string;
  children?: ReactNode;
}

export function AppSwitch({ label, children, ...props }: AppSwitchProps) {
  return (
    <Switch {...props}>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      {(label || children) && (
        <span className="text-sm">{label || children}</span>
      )}
    </Switch>
  );
}
