const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // 1. 웹 확장자를 우선순위 앞쪽으로 배치합니다.
    sourceExts: ["web.tsx", "web.ts", "web.jsx", "web.js", "tsx", "ts", "jsx", "js", "json"],
    // 2. 플랫폼 목록에 'web'을 추가합니다.
    platforms: ["android", "ios", "web"],
  },
};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
