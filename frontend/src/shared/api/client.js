export async function apiRequest(path, options = {}) {
  const response = await fetch(path, { credentials: 'include', headers: { 'content-type': 'application/json', ...(options.headers || {}) }, ...options });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(payload.error || `Request failed: ${response.status}`), { status: response.status });
  return payload.data ?? payload;
}
