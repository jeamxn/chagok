import type { NavigatorScreenParams, ParamListBase } from "@react-navigation/native";

/**
 * `NavigatorScreenParams`는 내부 ParamList를 타입 수준에서 역추론(infer)하기가 어려워서,
 * 중첩 스택 생성 시(name 유니온 체크) 타입이 `string`으로 풀리는 문제가 생길 수 있습니다.
 *
 * 아래 래퍼는 런타임 영향 없이 ParamList를 "브랜딩"해서,
 * `createNativeStackNavigator("MainStack")` 같은 헬퍼에서 ParamList를 안정적으로 추출할 수 있게 합니다.
 */
export type NestedNavigatorScreenParams<P extends ParamListBase> = NavigatorScreenParams<P> & {
  readonly __paramList?: P;
};

export type StackParamList = {
  MainStack: NestedNavigatorScreenParams<{
    main: undefined;
    test: undefined;
  }>;
  SubStack: NestedNavigatorScreenParams<{
    sub: undefined;
    test: undefined;
  }>;
};
