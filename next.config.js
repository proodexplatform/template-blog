const { resolve } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.(tsx|jsx)$/, // better targeting
      include: [resolve(__dirname, "src/app")],
      use: {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            ["@babel/preset-react", { runtime: "automatic" }],
            ["@babel/preset-typescript", { isTSX: true, allExtensions: true }]
          ],
          plugins: [
            resolve(__dirname, "babel-plugin-markers.cjs")
          ]
        }
      }
    });
    return config;
  }
};

module.exports = nextConfig;