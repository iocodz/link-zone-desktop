const linkZoneApiUrl = "http://192.168.1.1/jrd/webapi";

module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/api/:slug*",
      destination: linkZoneApiUrl,
    },
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
      config.node = {
        __dirname: true,
      };
    }

    return config;
  },
};
