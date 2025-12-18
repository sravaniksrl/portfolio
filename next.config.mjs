// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: { scrollRestoration: true }
// };
// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
