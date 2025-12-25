import { AppRegistry } from "react-native";

import { name as appName } from "../app.json";
import App from "../src/App";

// 웹에서는 root 태그에 마운트합니다.
AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root"),
});
