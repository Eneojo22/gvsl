// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/LeadwoodFunitures",
        destination: "/services/leadwoodfurniture",
        permanent: true,
      },
      {
        source: "/services/LeadwoodFunitures/leadwoods-funitures",
        destination: "/services/leadwoodfurniture/leadwoods-funitures",
        permanent: true,
      },
      {
        source: "/services/LeadwoodFunitures/leadwoods-funitures/order",
        destination: "/services/leadwoodfurniture/leadwoods-funitures/order",
        permanent: true,
      },
      {
        source: "/services/LeadwoodFunitures/leadwoods-funitures/order/order-success",
        destination: "/services/leadwoodfurniture/leadwoods-funitures/order/order-success",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
