// constants/styles.ts
import { StyleSheet } from "react-native";
import { getResponsiveFontSize } from "../helpers/Responsive";

const fontSizes = {
	h1: getResponsiveFontSize(29),
	h2: getResponsiveFontSize(26),
	medium: getResponsiveFontSize(16),
	small: getResponsiveFontSize(13)
};

const Typography = StyleSheet.create({
	h1Text: {
		fontSize: fontSizes.h1,
		fontFamily: "sans-serif",
		letterSpacing: -0.5,
		fontWeight: "600"
	},
	h2Text: {
		fontSize: fontSizes.h2,
		fontFamily: "sans-serif",
		fontWeight: "600"
	},
	mediumText: {
		fontSize: fontSizes.medium
	},
	smallText: {
		fontSize: fontSizes.small,
		letterSpacing: -0.1
	}
});

export { Typography, fontSizes };
