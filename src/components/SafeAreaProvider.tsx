import type { ReactNode } from "react";
import { Fragment } from "react";
import { Platform } from "react-native";

type SafeAreaProviderProps = {
  children: ReactNode;
};

let SafeAreaProviderImpl: React.ComponentType<SafeAreaProviderProps>;

if (Platform.OS !== "web") {
  // 네이티브에서는 실제 라이브러리 사용
  const { SafeAreaProvider: NativeProvider } = require("react-native-safe-area-context");
  SafeAreaProviderImpl = NativeProvider;
} else {
  // 웹에서는 Fragment로 감싸기만 함
  SafeAreaProviderImpl = ({ children }: SafeAreaProviderProps) => <Fragment>{children}</Fragment>;
}

const SafeAreaProvider = SafeAreaProviderImpl;

export default SafeAreaProvider;
