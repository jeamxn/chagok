import type { NavigatorScreenParams, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator as createRNStackNavigator } from "@react-navigation/native-stack";

import type { StackParamList } from "./types";

type ExtractNestedParamList<T> = T extends NavigatorScreenParams<infer P extends ParamListBase> ? P : never;

type NestedNavigatorKey = {
  [K in keyof StackParamList]: StackParamList[K] extends NavigatorScreenParams<ParamListBase> ? K : never;
}[keyof StackParamList];

const createNativeStackNavigator = <K extends NestedNavigatorKey>(_key: K) => {
  return createRNStackNavigator<ExtractNestedParamList<StackParamList[K]>>();
};

export default createNativeStackNavigator;
