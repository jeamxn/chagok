import createNativeStackNavigator from "@/navigation/createNativeStackNavigator";

import SubPage from "./page";
import TestPage from "./test";

export const Router = createNativeStackNavigator("SubStack");

const SubRoutes = () => {
  return (
    <Router.Navigator
      initialRouteName="sub"
      screenOptions={({ route }) => {
        return {
          title: route.name,
        };
      }}>
      <Router.Screen
        name="sub"
        component={SubPage}
        options={{
          title: "서브 화면",
        }}
      />
      <Router.Screen
        name="test"
        component={TestPage}
        options={{
          title: "sub - 테스트 화면",
        }}
      />
    </Router.Navigator>
  );
};

export default SubRoutes;
