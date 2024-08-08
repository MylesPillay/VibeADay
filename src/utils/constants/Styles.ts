// constants/styles.ts
import { StyleSheet } from "react-native";
import { getResponsiveFontSize } from "../helpers/Responsive";

const fontSizes = {
	h1: getResponsiveFontSize(45),
	h2: getResponsiveFontSize(41),
	medium: getResponsiveFontSize(29),
	small: getResponsiveFontSize(26)
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
