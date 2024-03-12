// const withPWA = await import("@ducanh2912/next-pwa").default({
//   dest: "public",
//   cacheOnFrontEndNav: true,
//   aggressiveFrontEndNavCaching: true,
//   reloadOnOnline: true,
//   swcMinify: true,
//   disable: process.env.NODE_ENV === "development",
//   workboxOptions: {
//     disableDevLogs: true,
//   },
//   // ... other options you like
// });

import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  "output": "export",
  trailingSlash: true,
  images: {
    loader: 'cloudinary',
    path: '/',
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "i.pravatar.cc/",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
    minimumCacheTTL: 1500000,
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      swcMinify: true,
      disable: process.env.NODE_ENV === "development",
      workboxOptions: {
        disableDevLogs: true,
      },
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
