const DEFAULT_DJANGO_API_BASE_URL = "http://127.0.0.1:8000";

const djangoApiBaseUrl = (
  process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL ?? DEFAULT_DJANGO_API_BASE_URL
).replace(/\/$/, "");

export function djangoApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${djangoApiBaseUrl}${normalizedPath}`;
}
