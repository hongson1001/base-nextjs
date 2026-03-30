const CDN_BASE =
  process.env.NEXT_PUBLIC_CDN_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

const PLACEHOLDER = "/images/placeholder.png";

/**
 * Build a full image URL from a storage key.
 * Returns a placeholder path if the key is falsy.
 */
export function getImageUrl(key?: string | null): string {
  if (!key) return PLACEHOLDER;

  // Already a full URL (e.g. from an external provider)
  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }

  return `${CDN_BASE}/uploads/${key}`;
}

/**
 * Build a thumbnail variant URL from a storage key.
 * Assumes the backend generates thumbnails at /uploads/thumbnails/<key>.
 */
export function getThumbnailUrl(key?: string | null): string {
  if (!key) return PLACEHOLDER;

  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }

  return `${CDN_BASE}/uploads/thumbnails/${key}`;
}
