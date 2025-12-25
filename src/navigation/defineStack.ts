import type { RouteNode } from "./types";

const defineStack = <const Screens extends Record<string, RouteNode>>(stack: {
  title?: string;
  initialRouteName?: keyof Screens;
  screens: Screens;
}) => stack;

export default defineStack;
