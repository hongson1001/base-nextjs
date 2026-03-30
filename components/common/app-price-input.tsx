"use client";

import { useState, useCallback } from "react";
import { TextField, Label, Input } from "@heroui/react";

export interface AppPriceInputProps {
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  currency?: string;
  error?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

function formatPrice(val: number | string | undefined): string {
  if (val === undefined || val === "") return "";
  const num = typeof val === "string" ? parseFloat(val) : val;

  if (isNaN(num)) return "";

  return num.toLocaleString("en-US");
}

function parsePrice(val: string): number | undefined {
  const cleaned = val.replace(/[^0-9.]/g, "");

  if (!cleaned) return undefined;
  const num = parseFloat(cleaned);

  return isNaN(num) ? undefined : num;
}

export function AppPriceInput({
  value,
  onChange,
  currency = "$",
  error,
  label,
  placeholder,
  className,
}: AppPriceInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatPrice(value));
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    const num = parsePrice(displayValue);

    setDisplayValue(num !== undefined ? String(num) : "");
  }, [displayValue]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    const num = parsePrice(displayValue);

    setDisplayValue(formatPrice(num));
  }, [displayValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      setDisplayValue(val);
      if (onChange) {
        onChange(parsePrice(val));
      }
    },
    [onChange],
  );

  return (
    <TextField
      className={`flex flex-col gap-1.5 ${className ?? ""}`}
      isInvalid={!!error}
    >
      {label && (
        <Label className="text-sm font-medium text-default-700">{label}</Label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-default-400">
          {currency}
        </span>
        <Input
          className="pl-7"
          inputMode="decimal"
          placeholder={placeholder}
          value={isFocused ? displayValue : formatPrice(value ?? displayValue)}
          variant="secondary"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </TextField>
  );
}
