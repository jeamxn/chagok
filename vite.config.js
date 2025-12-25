import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDev = mode !== "production";
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            // 1. 웹 지원을 위한 필수 플러그인
            "@babel/plugin-proposal-export-namespace-from",
            // 2. Reanimated v4용 Worklets 플러그인 (반드시 마지막에!)
            "react-native-worklets/plugin",
          ],
        },
      }),
    ],
    define: {
      global: "window",
      "process.env": {},
      __DEV__: JSON.stringify(isDev),
    },
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "@": path.resolve(__dirname, "./src"),
      },
      // 웹 확장자 우선 순위
      extensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"],
    },
    optimizeDeps: {
      esbuildOptions: {
        resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"],
        loader: {
          ".js": "jsx",
        },
      },
    },
  };
});
