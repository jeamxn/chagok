/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import SafeAreaProvider from "@/components/SafeAreaProvider";
import SafeAreaView from "@/components/SafeAreaView";
import useSafeAreaInsets from "@/hooks/useSafeAreaInsets";

import { Platform, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppContent isDarkMode={isDarkMode} />
    </SafeAreaProvider>
  );
};

const AppContent = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.content}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>차곡 🏦</Text>
        <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>플랫폼: {Platform.OS}</Text>
        <Text style={[styles.info, isDarkMode && styles.darkText]}>
          Safe Area Insets: top={insets.top}, bottom={insets.bottom}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#999",
  },
  darkText: {
    color: "#fff",
  },
});

export default App;
