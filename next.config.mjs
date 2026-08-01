const PRODUCTION_API = "https://api.everydaysurprises.com/v1";

function resolveApiOrigin() {
  const raw = (process.env.NEXT_PUBLIC_API_URL || PRODUCTION_API).replace(
    /\/$/,
    ""
  );
  // Guard against the retired Railway default hostname still set in old envs
  if (raw.includes("evds-production.up.railway.app")) {
    return PRODUCTION_API;
  }
  return raw;
}

const API_ORIGIN = resolveApiOrigin();

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
  // Same-origin proxy: browser calls /api/* (no CORS). Destination is the real API.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN}/:path*`,
      },
    ];
  },
};

export default nextConfig;
