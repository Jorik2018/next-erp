import type { NextConfig } from 'next'

const basePath =
  process.env.BASE_PATH ?? "";


const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_APPWRITE_ENDPOINT:process.env.APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID:process.env.APPWRITE_PROJECT_ID
  },
}

export default nextConfig





