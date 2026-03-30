/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint is run separately via `npm run lint` — skip during `next build`
    // to avoid incompatibility between Next.js built-in ESLint and flat config
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
