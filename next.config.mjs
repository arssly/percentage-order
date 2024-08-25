/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.bitpin.org",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "cdn.bitpin.ir",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
