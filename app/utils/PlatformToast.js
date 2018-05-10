import { Platform, ToastAndroid, AlertIOS } from "react-native";

export default show = (message) => {
	switch (Platform.OS) {
	case "ios":
		AlertIOS.alert("Error", message);
		break;
	case "android":
		ToastAndroid.show(message, ToastAndroid.SHORT);
		break;
	default:
		break;
	}
};
