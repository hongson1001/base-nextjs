export interface ExportColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  /** Optional formatter for the cell value */
  format?: (value: unknown, row: T) => string;
}

/**
 * Export an array of objects to a CSV file and trigger a browser download.
 */
export function exportToCsv<T extends Record<string, unknown>>(
  data: T[],
  columns: ExportColumn<T>[],
  filename = "export.csv",
): void {
  if (data.length === 0) return;

  const BOM = "\uFEFF"; // UTF-8 BOM for Excel compatibility
  const separator = ",";

  // Header row
  const header = columns.map((col) => escapeCell(col.label)).join(separator);

  // Data rows
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const raw = getNestedValue(row, col.key as string);
        const value = col.format ? col.format(raw, row) : String(raw ?? "");

        return escapeCell(value);
      })
      .join(separator),
  );

  const csv = BOM + [header, ...rows].join("\r\n");

  downloadBlob(csv, filename, "text/csv;charset=utf-8;");
}

function escapeCell(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj);
}

function downloadBlob(
  content: string,
  filename: string,
  mimeType: string,
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}
