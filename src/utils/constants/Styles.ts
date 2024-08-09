// constants/styles.ts
import { Dimensions, StyleSheet } from "react-native";
import { getResponsiveFontSize } from "../helpers/Responsive";

const windowHWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const smallScreenFontSizes = {
	h1: getResponsiveFontSize(30, windowHeight),
	h2: getResponsiveFontSize(26, windowHeight),
	medium: getResponsiveFontSize(14, windowHeight),
	small: getResponsiveFontSize(9, windowHeight)
};

const smallScreenChevronSizes = {
	headerChevron: getResponsiveFontSize(40, windowHeight),
	collapsibleChevrons: getResponsiveFontSize(40, windowHeight)
};

const Typography = StyleSheet.create({
	h1Text: {
		fontSize: smallScreenFontSizes.h1,
		fontFamily: "sans-serif",
		letterSpacing: getResponsiveFontSize(-0.5, windowHeight),
		fontWeight: "600"
	},
	h2Text: {
		fontSize: smallScreenFontSizes.h2,
		fontFamily: "sans-serif",
		fontWeight: "600"
	},
	mediumText: {
		fontSize: smallScreenFontSizes.medium
	},
	smallText: {
		fontSize: smallScreenFontSizes.small,
		letterSpacing: getResponsiveFontSize(-0.1, windowHeight)
	}
});

export { Typography, smallScreenChevronSizes };
