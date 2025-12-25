import type { ReactNode } from "react";
import { Platform, type StyleProp, View, type ViewStyle } from "react-native";

type SafeAreaViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Array<"top" | "bottom" | "left" | "right">;
};

let SafeAreaViewImpl: React.ComponentType<SafeAreaViewProps>;

if (Platform.OS !== "web") {
  // 네이티브에서는 실제 라이브러리 사용
  const { SafeAreaView: NativeView } = require("react-native-safe-area-context");
  SafeAreaViewImpl = NativeView;
} else {
  // 웹에서는 일반 View 사용
  SafeAreaViewImpl = ({ children, style }: SafeAreaViewProps) => <View style={style}>{children}</View>;
}

const SafeAreaView = SafeAreaViewImpl;

export default SafeAreaView;
