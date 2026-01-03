/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        domains: ['fakestoreapi.com'],
    },
    experimental: {
        optimizeCss: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Add this to handle routing
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig