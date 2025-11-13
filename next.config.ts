import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "www.murangaseal.com",
      //   pathname: "**",
      // },
      {
        protocol: "https",
        hostname: "icons8.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.ke.sportpesa.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "http://www.w3.org",
        pathname: "**",
      },
    ],
  },
};

//export default nextConfig;
export default withPayload(nextConfig) 
