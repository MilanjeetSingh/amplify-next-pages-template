/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@aws-amplify/ui-react',
    '@aws-amplify/adapter-nextjs'
  ],
  reactStrictMode: true,
  // This is required to make cookies work properly in SSR
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  }
}

module.exports = nextConfig
