/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "riki-s3-bucket.s3.us-east-2.amazonaws.com" }],
  },
};

export default nextConfig;
