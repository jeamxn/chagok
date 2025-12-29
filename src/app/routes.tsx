import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createStackComponentFromConfig, ROUTES, type StackParamList, typedEntries } from "@/navigation";

export const Router = createNativeStackNavigator<StackParamList>();

const STACK_COMPONENTS = typedEntries(ROUTES).reduce(
  (acc, [name, stack]) => {
    acc[name] = createStackComponentFromConfig(stack);
    return acc;
  },
  {} as Record<keyof typeof ROUTES, React.ComponentType>,
);

// const INITIAL_STACK = (typedEntries(ROUTES)[0]?.[0] ?? "main") as keyof typeof ROUTES;

const Routes = () => {
  return (
    <Router.Navigator
      initialRouteName="main"
      screenOptions={({ route }) => {
        return {
          title: route.name,
          headerShown: false,
        };
      }}>
      {typedEntries(STACK_COMPONENTS).map(([name, Component]) => (
        <Router.Screen
          key={String(name)}
          name={name}
          component={Component}
          options={{
            title: ROUTES[name].title ?? String(name),
          }}
        />
      ))}
    </Router.Navigator>
  );
};

export default Routes;
