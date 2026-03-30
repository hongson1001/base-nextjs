/**
 * Format a number as currency.
 */
export function formatCurrency(
  amount: number,
  locale = "vi-VN",
  currency = "VND",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(amount);
}

/**
 * Format a date string or Date object.
 * Default format uses the locale's medium date style.
 */
export function formatDate(
  date: string | Date,
  locale = "vi-VN",
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options,
  });
}

/**
 * Format a date with both date and time.
 */
export function formatDateTime(date: string | Date, locale = "vi-VN"): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format a number with locale-appropriate separators.
 */
export function formatNumber(num: number, locale = "vi-VN"): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Return a human-readable relative time string (e.g. "2 hours ago").
 */
export function formatRelativeTime(
  date: string | Date,
  locale = "vi-VN",
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffSec = Math.round(diffMs / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const thresholds: Array<{
    limit: number;
    unit: Intl.RelativeTimeFormatUnit;
    divisor: number;
  }> = [
    { limit: 60, unit: "second", divisor: 1 },
    { limit: 3600, unit: "minute", divisor: 60 },
    { limit: 86400, unit: "hour", divisor: 3600 },
    { limit: 2592000, unit: "day", divisor: 86400 },
    { limit: 31536000, unit: "month", divisor: 2592000 },
    { limit: Infinity, unit: "year", divisor: 31536000 },
  ];

  for (const { limit, unit, divisor } of thresholds) {
    if (Math.abs(diffSec) < limit) {
      return rtf.format(-Math.round(diffSec / divisor), unit);
    }
  }

  return rtf.format(-Math.round(diffSec / 31536000), "year");
}
