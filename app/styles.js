import { StyleSheet, Platform } from "react-native";

export const composerStyles = StyleSheet.create({
	textInput: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
		lineHeight: 16,
		marginTop: Platform.select({
			ios: 6,
			android: 0,
		}),
		marginBottom: Platform.select({
			ios: 5,
			android: 3,
		}),
	},
});


const textStyle = {
	fontSize: 16,
	lineHeight: 20,
	marginTop: 5,
	marginBottom: 5,
	marginLeft: 10,
	marginRight: 10,
};


export const messageTextStyles = {
	left: StyleSheet.create({
		container: {},
		text: {
			color: "black",
			...textStyle,
		},
		link: {
			color: "black",
			textDecorationLine: "underline",
		},
	}),
	right: StyleSheet.create({
		container: {},
		text: {
			color: "white",
			...textStyle,
		},
		link: {
			color: "white",
			textDecorationLine: "underline",
		},
	})
};

export const loginStyles = StyleSheet.create({
	row: {
		height: 200
	},
	form: {
		justifyContent: "center",
		flex: 1
	}
});

export const indicatorStyles = StyleSheet.create({
	center: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	}
});

export const spinnerProps = {
	size: "large",
	color: "#0000ff"
}

export const popupIcon = {
	name: "md-more",
	size: 24,
	color: "blue",
	ref: "menu"

};

export const popupStyles = StyleSheet.create({
	main: {
		alignSelf: "center",
		backgroundColor: "transparent",
		paddingLeft: 15,
		paddingRight: 15
	}
})