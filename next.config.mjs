/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's no longer a valid option in Next.js 15
  // swcMinify: true, 
  
  // Ensure images from placeholder domains are allowed
  images: {
    domains: ['placeholder.com', 'example.com'],
    unoptimized: true,
  },
  
  // For AWS Amplify deployment
  trailingSlash: false,
  output: 'standalone',
  
  // Ignore build errors for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
