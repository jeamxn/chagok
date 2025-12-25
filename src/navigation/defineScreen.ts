import type { ScreenNode } from "./types";

const defineScreen = <const T extends ScreenNode>(screen: T) => screen;

export default defineScreen;
