import { Platform, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
      }}>
      <Text style={styles.title}>chagok</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Platform.select({
      ios: "Wanted Sans Variable",
      default: "WantedSansVariable",
    }),
    color: "#FF2A30",
    fontSize: 120,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
});

export default LoginPage;
