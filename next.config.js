/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  basePath: "/farmer-database",
  assetPrefix: "/farmer-database",
  images: {
    domains: ['himstaging1.hp.gov.in'], // Add your hostname here
  },
  serverRuntimeConfig: {
    // Server-side runtime configuration
    // You can access this config only on the server-side
    MY_HOSTNAME: 'himstaging1.hp.gov.in'
  },
  publicRuntimeConfig: {
    // Public runtime configuration
    // Accessible both on server-side and client-side
    MY_HOSTNAME: 'himstaging1.hp.gov.in'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
};

module.exports = nextConfig;
