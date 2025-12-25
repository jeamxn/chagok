import type { NavigatorScreenParams } from "@react-navigation/native";

export type StackParamList = {
  MainStack: NavigatorScreenParams<{
    main: undefined;
    test: undefined;
  }>;
  SubStack: NavigatorScreenParams<{
    sub: undefined;
    test: undefined;
  }>;
};
