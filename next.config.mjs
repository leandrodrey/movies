/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'e1.pxfuel.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lumiere-a.akamaihd.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
