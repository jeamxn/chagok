/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
  // Your custom options.
};

module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@": "./src",
        },
      },
    ],
    "@babel/plugin-proposal-export-namespace-from",
    ["react-native-worklets/plugin", workletsPluginOptions],
  ],
};
