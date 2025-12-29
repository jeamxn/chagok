import LoginPage from "@/app/login/page";
import MainPage from "@/app/main/page";
import MainTestPage from "@/app/main/test";
import SubPage from "@/app/sub/page";
import SubTestPage from "@/app/sub/test";

import defineScreen from "./defineScreen";
import defineStack from "./defineStack";

const ROUTES = {
  login: defineStack({
    title: "로그인",
    initialRouteName: "index",
    screens: {
      index: defineScreen({
        title: "로그인 화면",
        component: LoginPage,
      }),
    },
  }),
  main: defineStack({
    title: "메인",
    initialRouteName: "index",
    screens: {
      index: defineScreen({
        title: "메인 화면",
        component: MainPage,
      }),
      test: defineScreen({
        title: "main - 테스트 화면",
        component: MainTestPage,
      }),
    },
  }),
  sub: defineStack({
    title: "서브",
    initialRouteName: "index",
    screens: {
      index: defineScreen({
        title: "서브 화면",
        component: SubPage,
      }),
      test: defineScreen({
        title: "sub - 테스트 화면",
        component: SubTestPage,
      }),
      SubSubStack: defineStack({
        title: "서브 서브",
        initialRouteName: "subSub",
        screens: {
          subSub: defineScreen({
            title: "서브 서브 화면",
            component: SubTestPage,
          }),
        },
      }),
    },
  }),
} as const;

export default ROUTES;
