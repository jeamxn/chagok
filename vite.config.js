import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "@": path.resolve(__dirname, "./src"),
    },
    // 중요: 웹 확장자(.web.tsx, .web.js 등)를 가장 먼저 찾도록 우선순위 지정
    extensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"],
  },
  optimizeDeps: {
    esbuildOptions: {
      // 의존성 사전 번들링 시에도 웹 확장자 우선 순위 적용
      resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"],
      loader: {
        ".js": "jsx",
      },
    },
  },
});
