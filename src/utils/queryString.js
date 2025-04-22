// src/utils/buildQueryString.js
export function buildQueryString(params = {}, defaults = {}) {
  const query = Object.entries(params)
    .filter(([key, value]) => value !== defaults[key])
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
  return query.length ? `?${query.join("&")}` : "";
}
