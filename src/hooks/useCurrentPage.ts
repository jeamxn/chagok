import { type NavigationProp, type ParamListBase, useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";

import ROUTES from "@/navigation/routes";
import type { RouteNode, StackNode } from "@/navigation/types";

export type CurrentPageInfo = {
  title: string;
  path: string;
  routeNames: string[];
};

type NavStateLike = {
  index?: number;
  routes?: Array<{
    name: string;
    state?: NavStateLike;
  }>;
};

const isStackNode = (node: RouteNode): node is StackNode => "screens" in node;

const getActiveRouteNames = (state: NavStateLike | undefined): string[] => {
  const routes = state?.routes;
  if (!routes || routes.length === 0) return [];

  const index = state?.index ?? 0;
  const route = routes[index];
  if (!route) return [];

  const child = getActiveRouteNames(route.state);
  return [route.name, ...child];
};

const getTitleFromRoutes = (routeNames: string[]): string | undefined => {
  if (routeNames.length === 0) return undefined;

  const [root, ...rest] = routeNames;
  const rootNode = (ROUTES as Record<string, StackNode | undefined>)[root];
  if (!rootNode) return undefined;

  let node: RouteNode = rootNode;
  let lastTitle: string | undefined = node.title ?? root;

  for (const name of rest) {
    if (!isStackNode(node)) break;
    const next = node.screens[name] as RouteNode | undefined;
    if (!next) break;
    node = next;
    lastTitle = node.title ?? lastTitle;
  }

  return lastTitle;
};

const useCurrentPage = (): CurrentPageInfo => {
  // 이 훅이 스크린 안에서 호출되면 "해당 스택"의 state만 보이므로,
  // parent를 타고 올라가 루트 네비게이션 state를 구해 full path를 만든다.
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const rootNavigation = useMemo(() => {
    let nav: NavigationProp<ParamListBase> = navigation;
    while (nav.getParent()) {
      nav = nav.getParent() as NavigationProp<ParamListBase>;
    }
    return nav;
  }, [navigation]);

  const [rootState, setRootState] = useState<NavStateLike | undefined>(() => {
    return rootNavigation.getState() as unknown as NavStateLike;
  });

  useEffect(() => {
    setRootState(rootNavigation.getState() as unknown as NavStateLike);

    const unsubscribe = rootNavigation.addListener("state", () => {
      setRootState(rootNavigation.getState() as unknown as NavStateLike);
    });

    return unsubscribe;
  }, [rootNavigation]);

  return useMemo(() => {
    const routeNames = getActiveRouteNames(rootState);
    const path = routeNames.join("/");
    const title = getTitleFromRoutes(routeNames) ?? routeNames[routeNames.length - 1] ?? "";
    return { title, path, routeNames };
  }, [rootState]);
};

export default useCurrentPage;
