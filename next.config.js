const path = require("path");
const appRootPath = require("app-root-path").toString();
const { StatsWriterPlugin } = require("webpack-stats-plugin");

module.exports = {
  assetPrefix: "",
  async exportPathMap() {
    return {
      "/": { page: "/" },
    };
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    if (process.env.PROFILE) {
      config.resolve.alias["react-dom$"] = "react-dom/profiling";
      config.resolve.alias["scheduler/tracing"] = "scheduler/tracing-profiling";
      config.optimization.minimize = false;
    }
    config.plugins.push(
      new StatsWriterPlugin({
        filename: "stats.json",
        stats: {
          context: ".", // optional, will improve readability of the paths
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true,
        },
      }),
    );

    return config;
  },
};
