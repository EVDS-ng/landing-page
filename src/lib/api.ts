/**
 * Browser-facing API base: same-origin `/api`.
 * next.config.mjs rewrites `/api/*` → the real backend, so contribution pages
 * never depend on a baked-in absolute host and never hit CORS.
 */
export const API_BASE = "/api";
