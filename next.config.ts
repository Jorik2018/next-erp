import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  basePath: process.env.BASE_PATH || '',
}

export default nextConfig