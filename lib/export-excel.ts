import type { ExportColumn } from "./export-csv";

/**
 * Export data to an Excel-compatible .xls file using an HTML table approach.
 * This avoids heavy dependencies (like xlsx/exceljs) while producing a file
 * that Excel, Google Sheets, and LibreOffice can open.
 *
 * For production use with complex formatting needs, consider replacing this
 * with a proper xlsx library.
 */
export function exportToExcel<T extends Record<string, unknown>>(
  data: T[],
  columns: ExportColumn<T>[],
  filename = "export.xls",
): void {
  if (data.length === 0) return;

  const headerCells = columns
    .map(
      (col) =>
        `<th style="background:#4472C4;color:#fff;font-weight:bold;padding:8px;border:1px solid #ccc;">${escapeHtml(col.label)}</th>`,
    )
    .join("");

  const bodyRows = data
    .map((row, idx) => {
      const bgColor = idx % 2 === 0 ? "#fff" : "#D9E2F3";
      const cells = columns
        .map((col) => {
          const raw = getNestedValue(row, col.key as string);
          const value = col.format ? col.format(raw, row) : String(raw ?? "");

          return `<td style="padding:6px;border:1px solid #ccc;background:${bgColor};">${escapeHtml(value)}</td>`;
        })
        .join("");

      return `<tr>${cells}</tr>`;
    })
    .join("");

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="UTF-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Sheet1</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
    </head>
    <body>
      <table>
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </body>
    </html>
  `.trim();

  const blob = new Blob(["\uFEFF" + html], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj);
}
