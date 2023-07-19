/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "tjzk.replicate.delivery",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "a16z.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
