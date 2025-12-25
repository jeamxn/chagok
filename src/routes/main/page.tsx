import { Button, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useCurrentPage from "@/hooks/useCurrentPage";
import useNavigation from "@/hooks/useNavigation";

const MainPage = () => {
  const currentPage = useCurrentPage();
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="너비 변경하기" onPress={handlePress} />
      <Button
        title="Test 이동"
        onPress={() =>
          navigation.navigate("main", {
            screen: "test",
          })
        }
      />
      <Button
        title="SubPage로 이동"
        onPress={() =>
          navigation.navigate("sub", {
            screen: "SubSubStack",
            params: {
              screen: "subSub",
            },
          })
        }
      />
      <Button
        title="제목 변경"
        onPress={() =>
          navigation.setOptions({
            title: "123123",
          })
        }
      />
      <Text>Hello World</Text>
      <Text>title: {currentPage.title}</Text>
      <Text>path:{currentPage.path}</Text>
      <Text>routeNames:{currentPage.routeNames.join(", ")}</Text>
      <Text>{safeAreaInsets.top}</Text>
      <Text>{safeAreaInsets.bottom}</Text>
      <Text>{safeAreaInsets.left}</Text>
      <Text>{safeAreaInsets.right}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
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

export default MainPage;
