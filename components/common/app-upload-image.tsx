"use client";

import { useCallback, useRef, useState } from "react";

export interface AppUploadImageProps {
  onUpload?: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  previews?: string[];
  className?: string;
}

export function AppUploadImage({
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  previews: externalPreviews,
  className,
}: AppUploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previews = externalPreviews ?? localPreviews;

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);
      const oversized = fileArray.find((f) => f.size > maxSize);

      if (oversized) {
        setError(
          `File "${oversized.name}" exceeds ${(maxSize / 1024 / 1024).toFixed(1)}MB limit`,
        );

        return;
      }

      const urls = fileArray.map((f) => URL.createObjectURL(f));

      if (!externalPreviews) {
        setLocalPreviews((prev) => (multiple ? [...prev, ...urls] : urls));
      }
      onUpload?.(fileArray);
    },
    [maxSize, multiple, onUpload, externalPreviews],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
  };

  const removePreview = (index: number) => {
    if (!externalPreviews) {
      setLocalPreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className={className}>
      <div
        className={`relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer ${
          isDragOver
            ? "border-primary bg-primary/10"
            : "border-default-300 hover:border-primary"
        }`}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <svg
          className="h-8 w-8 text-default-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm text-default-500">
          Drag & drop images here, or click to browse
        </p>
        <input
          ref={inputRef}
          accept={accept}
          className="hidden"
          multiple={multiple}
          type="file"
          onChange={handleChange}
        />
      </div>

      {error && <p className="mt-2 text-sm text-danger">{error}</p>}

      {previews.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {previews.map((src, index) => (
            <div key={index} className="group relative">
              <img
                alt={`Preview ${index + 1}`}
                className="h-20 w-20 rounded-md object-cover"
                src={src}
              />
              {!externalPreviews && (
                <button
                  className="absolute -right-1 -top-1 z-10 hidden h-5 w-5 items-center justify-center rounded-full bg-danger text-white text-xs group-hover:flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePreview(index);
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
