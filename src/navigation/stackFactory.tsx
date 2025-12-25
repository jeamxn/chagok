import { createNativeStackNavigator } from "@react-navigation/native-stack";

import typedEntries from "./typedEntries";
import type { ParamListFromStack, StackNode } from "./types";

/**
 * ROUTES의 StackNode로부터 실제 Navigator 컴포넌트를 생성한다.
 * - 중첩 스택(StackNode)은 재귀로 컴포넌트를 만들어 Screen으로 등록
 */
const createStackComponentFromConfig = <const S extends StackNode>(stack: S) => {
  type ParamList = ParamListFromStack<S["screens"]>;
  type RouteName = Extract<keyof ParamList, string>;
  const Stack = createNativeStackNavigator<ParamList>();

  const StackComponent = () => {
    return (
      <Stack.Navigator
        initialRouteName={stack.initialRouteName as RouteName | undefined}
        screenOptions={({ route }) => {
          return {
            title: route.name,
            headerShown: false,
          };
        }}>
        {typedEntries(stack.screens).map(([name, node]) => {
          if (!("screens" in node)) {
            return (
              <Stack.Screen
                key={String(name)}
                name={name as RouteName}
                component={node.component}
                options={{
                  title: node.title,
                }}
              />
            );
          }

          const Child = createStackComponentFromConfig(node);
          return (
            <Stack.Screen
              key={String(name)}
              name={name as RouteName}
              component={Child}
              options={{
                title: node.title ?? String(name),
              }}
            />
          );
        })}
      </Stack.Navigator>
    );
  };

  return StackComponent;
};

export default createStackComponentFromConfig;
