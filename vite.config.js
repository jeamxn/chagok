import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDev = mode !== "production";
  return {
    root: path.resolve(__dirname, "web"),
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
    server: {
      fs: {
        // web/ 아래에서 ../src, ../app.json 등을 import 할 수 있도록 허용
        allow: [path.resolve(__dirname)],
      },
    },
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "@": path.resolve(__dirname, "./src"),
      },
      // 웹 확장자 우선 순위
      extensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"],
    },
    esbuild: {
      // Reanimated Worklet이 작동하려면 함수 이름을 보존해야 할 수 있습니다.
      keepNames: true,
    },
    build: {
      // root를 web/로 바꾸더라도 산출물은 루트 dist/를 유지 (Docker/Nginx 흐름과 일치)
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
      commonjsOptions: {
        // CommonJS 모듈 변환 시 오류 방지
        transformMixedEsModules: true,
      },
      // 때로는 minification이 너무 강력하면 에러가 납니다.
      // 만약 위 설정으로도 안 되면 아래 minify를 false로 바꿔보세요 (최후의 수단).
      minify: "esbuild",
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
