import { AppRegistry } from "react-native";

import { name as appName } from "../app.json";
// 웹에서는 폰트를 직접 로드해야 합니다(Vite가 asset으로 번들링하도록 ?url 사용).
import wantedSansVariableUrl from "../src/assets/fonts/WantedSansVariable.ttf?url";
import App from "../src/index";

const fontStyleEl = document.createElement("style");
fontStyleEl.setAttribute("data-fonts", "WantedSansVariable");
fontStyleEl.textContent = `
@font-face {
  font-family: "WantedSansVariable";
  src: url(${wantedSansVariableUrl}) format("truetype");
  font-display: swap;
}
/* iOS에서 실제 family 이름이 'Wanted Sans Variable'로 잡히는 경우가 있어 웹에서도 alias를 등록 */
@font-face {
  font-family: "Wanted Sans Variable";
  src: url(${wantedSansVariableUrl}) format("truetype");
  font-display: swap;
}
`;
document.head.appendChild(fontStyleEl);

// 웹에서는 root 태그에 마운트합니다.
AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root"),
});
