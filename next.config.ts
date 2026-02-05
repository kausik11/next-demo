import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.slingacademy.com",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;


//access images cdn from another external domain another way
// module.exports = {
//   images: {
//     domains: ['cdn.example.com', 'images.unsplash.com'],
//   },
// }