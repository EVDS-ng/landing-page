/**
 * Public API base URL (includes `/v1`).
 * NEXT_PUBLIC_* is inlined at build time — keep Dockerfile/Railway build args in sync.
 */
const FALLBACK_API = "https://api.everydaysurprises.com/v1";

export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || FALLBACK_API
).replace(/\/$/, "");
