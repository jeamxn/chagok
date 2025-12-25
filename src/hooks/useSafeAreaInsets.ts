import { Platform } from "react-native";

export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

let useSafeAreaInsetsImpl: () => SafeAreaInsets;

if (Platform.OS !== "web") {
  // 네이티브에서는 실제 라이브러리 사용
  const { useSafeAreaInsets: nativeHook } = require("react-native-safe-area-context");
  useSafeAreaInsetsImpl = nativeHook;
} else {
  // 웹에서는 기본값 반환
  useSafeAreaInsetsImpl = () => ({ top: 0, bottom: 0, left: 0, right: 0 });
}

const useSafeAreaInsets = useSafeAreaInsetsImpl;

export default useSafeAreaInsets;
