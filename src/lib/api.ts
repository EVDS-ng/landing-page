/**
 * Browser → public API base (includes `/v1`).
 *
 * Always prefer the production API host. Do not proxy through the landing
 * origin: Cloudflare blocks orange-cloud → orange-cloud fetches with
 * "DNS points to prohibited IP" (403). Backend CORS already allows
 * everydaysurprises.com and www.everydaysurprises.com.
 */
export const API_BASE = "https://api.everydaysurprises.com/v1";
