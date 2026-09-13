const rawApiUrl =
  import.meta.env.VITE_API_URL || "";

export const API_BASE_URL =
  rawApiUrl.replace(/\/$/, "");

export function apiUrl(path) {
  const normalisedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return `${API_BASE_URL}${normalisedPath}`;
}