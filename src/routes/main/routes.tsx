import createNativeStackNavigator from "@/navigation/createNativeStackNavigator";

import MainPage from "./page";
import TestPage from "./test";

export const Router = createNativeStackNavigator("MainStack");

const MainRoutes = () => {
  return (
    <Router.Navigator
      initialRouteName="main"
      screenOptions={({ route }) => {
        return {
          title: route.name,
        };
      }}>
      <Router.Screen
        name="main"
        component={MainPage}
        options={{
          title: "메인 화면",
        }}
      />
      <Router.Screen
        name="test"
        component={TestPage}
        options={{
          title: "main - 테스트 화면",
        }}
      />
    </Router.Navigator>
  );
};

export default MainRoutes;
