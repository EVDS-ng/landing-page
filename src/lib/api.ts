/**
 * Public API base (includes `/v1`).
 *
 * Call the API host directly from the browser. Do NOT proxy through
 * next.config rewrites to api.everydaysurprises.com — both landing and API
 * sit behind Cloudflare, and server-side rewrites hit
 * "DNS points to prohibited IP" (HTTP 403).
 *
 * CORS allows everydaysurprises.com / www on the backend.
 */
const PRODUCTION_API = "https://api.everydaysurprises.com/v1";

function resolveApiBase() {
  const raw = (process.env.NEXT_PUBLIC_API_URL || PRODUCTION_API).replace(
    /\/$/,
    ""
  );
  // Retired Railway hostname still baked into some old envs
  if (!raw || raw.includes("evds-production.up.railway.app")) {
    return PRODUCTION_API;
  }
  return raw;
}

export const API_BASE = resolveApiBase();
