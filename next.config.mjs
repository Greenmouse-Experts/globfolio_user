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

export default nextConfig;
