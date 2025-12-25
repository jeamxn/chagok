import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { StackParamList } from "@/navigation/types";

import MainRoutes from "./main/routes";
import SubRoutes from "./sub/routes";

export const Router = createNativeStackNavigator<StackParamList>();

const Routes = () => {
  return (
    <Router.Navigator
      initialRouteName="MainStack"
      screenOptions={({ route }) => {
        return {
          title: route.name,
        };
      }}>
      <Router.Screen
        name="MainStack"
        component={MainRoutes}
        options={{
          title: "메인 화면",
        }}
      />
      <Router.Screen name="SubStack" component={SubRoutes} />
    </Router.Navigator>
  );
};

export default Routes;
