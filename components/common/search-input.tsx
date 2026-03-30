"use client";

import { TextField, Input } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SearchIcon } from "@/components/icons";

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  className?: string;
}

export function SearchInput({
  value: controlledValue,
  onChange,
  placeholder = "Search...",
  debounce = 300,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      setInternalValue(val);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onChange?.(val);
      }, debounce);
    },
    [onChange, debounce],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <TextField className={className}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400">
          <SearchIcon />
        </span>
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={internalValue}
          variant="secondary"
          onChange={handleChange}
        />
      </div>
    </TextField>
  );
}
