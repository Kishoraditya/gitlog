import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "gitlog-ai",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",

  // Modern Sentry v10 Configuration
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // These move into the bundles-level or specific feature objects in v10
  // But the warning specifically mentions webpack.<key>
  // In Sentry Next.js SDK, these are often experimental or new top-level keys

  // Move deprecated properties into the webpack object for v10+ compatibility 
  // Note: These are not supported with Turbopack, but this silences the deprecation warnings.
  // @ts-ignore
  webpack: {
    automaticVercelMonitors: true,
    reactComponentAnnotation: { enabled: true },
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
