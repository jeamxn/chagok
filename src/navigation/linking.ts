import type { LinkingOptions } from "@react-navigation/native";

import ROUTES from "./routes";
import type { RouteNode, StackNode, StackParamList } from "./types";

const isStackNode = (node: RouteNode): node is StackNode => "screens" in node;

const buildScreensConfig = (stack: StackNode): Record<string, unknown> => {
  const screens: Record<string, unknown> = {};

  for (const [name, node] of Object.entries(stack.screens)) {
    if (isStackNode(node)) {
      // nested stack: path는 스택 이름(키)로 두고, 그 아래는 재귀로 이어붙임
      screens[name] = {
        path: name,
        screens: buildScreensConfig(node),
      };
      continue;
    }

    // 일반 screen
    // - index는 스택 루트로 매핑: /main
    // - 그 외는: /main/test
    screens[name] = name === "index" ? "" : name;
  }

  return screens;
};

export const linking: LinkingOptions<StackParamList> = {
  // RN(Web)에서는 "/" prefix로 history 기반 path를 처리할 수 있음.
  // (RN 전용 tsconfig에선 DOM lib가 없어서 window 참조는 피함)
  prefixes: ["/"],
  config: {
    // 루트 스택들은 `/main`, `/sub` 같은 1-depth path
    screens: Object.fromEntries(
      Object.entries(ROUTES).map(([stackName, stack]) => [
        stackName,
        {
          path: stackName,
          screens: buildScreensConfig(stack),
        },
      ]),
    ),
  },
};
