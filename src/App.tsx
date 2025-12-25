/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Button, StatusBar, StyleSheet, Text, useColorScheme } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppContent />
    </SafeAreaProvider>
  );
};

const AppContent = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const width = useSharedValue(100);

  // 2. 애니메이션 값에 따라 스타일이 어떻게 변할지 정의
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const handlePress = () => {
    // 3. 값 변경 시 withSpring 같은 함수로 감싸면 애니메이션 자동 적용
    // 랜덤 너비 (100 ~ 300 사이)
    width.value = withSpring(Math.random() * 200 + 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="너비 변경하기" onPress={handlePress} />
      <Text>Hello World</Text>
      <Text>{safeAreaInsets.top}</Text>
      <Text>{safeAreaInsets.bottom}</Text>
      <Text>{safeAreaInsets.left}</Text>
      <Text>{safeAreaInsets.right}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  box: {
    height: 100,
    backgroundColor: "violet",
    borderRadius: 20,
    marginBottom: 20,
  },
});

export default App;
