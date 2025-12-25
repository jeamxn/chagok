import type { NavigatorScreenParams } from "@react-navigation/native";
import type { ComponentType } from "react";

import type ROUTES from "./routes";

/**
 * ROUTES를 단일 소스 오브 트루스로 두기 위한 네비게이션 설정 타입
 * - stack은 `screens`를 재귀적으로 가짐 (중첩 스택 가능)
 * - 런타임 구분은 `"screens" in node`로 함 (kind 불필요)
 */
export type ScreenNode = {
  title: string;
  // React Navigation이 { route, navigation } props를 주기 때문에 object로 두어 대부분의 화면 컴포넌트가 그대로 들어갈 수 있게 합니다.
  component: ComponentType<object>;
};

export type StackNode = {
  title?: string;
  initialRouteName?: string;
  screens: Record<string, RouteNode>;
};

export type RouteNode = ScreenNode | StackNode;

type RoutesConfig = typeof ROUTES;

export type ParamListFromNode<N extends RouteNode> = N extends StackNode
  ? NavigatorScreenParams<ParamListFromStack<N["screens"]>>
  : undefined;

export type ParamListFromStack<Screens extends Record<string, RouteNode>> = {
  [K in keyof Screens]: ParamListFromNode<Screens[K]>;
};

export type StackParamList = {
  [K in keyof RoutesConfig]: RoutesConfig[K] extends StackNode
    ? NavigatorScreenParams<ParamListFromStack<RoutesConfig[K]["screens"]>>
    : never;
};
