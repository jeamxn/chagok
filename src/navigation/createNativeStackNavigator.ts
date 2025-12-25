import type { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator as createRNStackNavigator } from "@react-navigation/native-stack";

import type { StackParamList } from "./types";

type ExtractNestedParamList<T> =
  NonNullable<T> extends { readonly __paramList?: infer P } ? (P extends ParamListBase ? P : never) : never;

type NestedNavigatorKey = {
  [K in keyof StackParamList]: ExtractNestedParamList<StackParamList[K]> extends never ? never : K;
}[keyof StackParamList];

const createNativeStackNavigator = <K extends NestedNavigatorKey>(_key: K) => {
  return createRNStackNavigator<ExtractNestedParamList<StackParamList[K]>>();
};

export default createNativeStackNavigator;
