import { AppRegistry } from "react-native";
import App from "./App";
var HeadlessTask = require("./app/utils/HeadlessTask");

AppRegistry.registerHeadlessTask("HeadlessTask", () => HeadlessTask);
AppRegistry.registerComponent("testApp", () => App);
