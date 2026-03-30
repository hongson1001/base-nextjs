"use client";

import { TextField, Label, TextArea } from "@heroui/react";

export interface AppEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  rows?: number;
  className?: string;
}

/**
 * Rich text editor placeholder.
 * Currently uses a TextArea. Replace with a proper WYSIWYG editor
 * (e.g., TipTap, Lexical, or React Quill) when needed.
 */
export function AppEditor({
  value,
  onChange,
  label,
  placeholder = "Enter content...",
  error,
  rows = 6,
  className,
}: AppEditorProps) {
  return (
    <TextField
      className={`flex flex-col gap-1.5 ${className ?? ""}`}
      isInvalid={!!error}
    >
      {label && (
        <Label className="text-sm font-medium text-default-700">{label}</Label>
      )}
      <TextArea
        placeholder={placeholder}
        rows={rows}
        value={value}
        variant="secondary"
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </TextField>
  );
}
