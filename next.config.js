// next.config.js
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    extendDefaultRuntimeCaching: true,
    workboxOptions: {
      runtimeCaching: [
      ],
    },
  });
  

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
});

module.exports = nextConfig;
