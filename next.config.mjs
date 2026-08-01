/**
 * Optional same-origin proxy for server-side tools only.
 * Prefer browser → https://api.everydaysurprises.com (see src/lib/api.ts).
 *
 * If anything still hits /api/*, proxy to the Railway backend host directly —
 * NOT api.everydaysurprises.com (Cloudflare "DNS points to prohibited IP"
 * when one CF-proxied service fetches another).
 */
const API_REWRITE_ORIGIN = (
  process.env.API_REWRITE_ORIGIN ||
  "https://evds-backend-production.up.railway.app/v1"
).replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_REWRITE_ORIGIN}/:path*`,
      },
    ];
  },
};

export default nextConfig;
