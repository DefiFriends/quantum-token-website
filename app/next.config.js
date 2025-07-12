/** @type {import('next').NextConfig} */
const nextConfig = {
eslint: {
// Disable ESLint during builds
ignoreDuringBuilds: true,
},
typescript: {
// Disable TypeScript errors during builds
ignoreBuildErrors: true,
},
experimental: {
// Disable strict mode checks
esmExternals: 'loose',
},
// Disable React strict mode for build
reactStrictMode: false,
}

module.exports = nextConfig