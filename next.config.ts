/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**/*' },
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '', pathname: '/**/*' },
      { protocol: 'https', hostname: 'api.cloudinary.com', port: '', pathname: '/**/*' }
    ]
  }
}

module.exports = nextConfig
