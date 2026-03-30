"use client";

import { type ComponentPropsWithRef } from "react";
import { TextField, Label, Input, FieldError } from "@heroui/react";

export interface AppInputProps extends ComponentPropsWithRef<typeof Input> {
  label?: string;
  error?: string;
  isRequired?: boolean;
  type?: string;
  autoComplete?: string;
}

export function AppInput({
  label,
  error,
  isRequired,
  className,
  ...props
}: AppInputProps) {
  return (
    <TextField
      className="flex flex-col gap-1.5"
      isInvalid={!!error}
      isRequired={isRequired}
    >
      {label && (
        <Label className="text-sm font-medium text-default-700">{label}</Label>
      )}
      <Input className={className} variant="secondary" {...props} />
      {error && (
        <FieldError className="text-xs text-danger">{error}</FieldError>
      )}
    </TextField>
  );
}
