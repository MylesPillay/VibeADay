// constants/styles.ts
import { Dimensions, StyleSheet } from "react-native";
import { getResponsiveFontSize } from "../helpers/Responsive";
import { RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const smallScreenFontSizes = {
	h1: getResponsiveFontSize(30),
	h2: getResponsiveFontSize(26),
	medium: getResponsiveFontSize(14),
	small: getResponsiveFontSize(9)
};

const largeScreenFontSizes = {
	h1: getResponsiveFontSize(45),
	h2: getResponsiveFontSize(41),
	medium: getResponsiveFontSize(29),
	small: getResponsiveFontSize(26)
};

const smallScreenChevronSizes = {
	headerChevron: getResponsiveFontSize(40),
	collapsibleChevrons: getResponsiveFontSize(40)
};
const largeScreenChevronSizes = {
	headerChevron: getResponsiveFontSize(70),
	collapsibleChevrons: getResponsiveFontSize(70)
};

const Typography = StyleSheet.create({
	h1Text: {
		fontSize:
			windowHeight > 700
				? largeScreenFontSizes.h1
				: smallScreenFontSizes.h1,
		fontFamily: "sans-serif",
		letterSpacing: RFValue(-0.5),
		fontWeight: "600"
	},
	h2Text: {
		fontSize:
			windowHeight > 700
				? largeScreenFontSizes.h2
				: smallScreenFontSizes.h2,
		fontFamily: "sans-serif",
		fontWeight: "600"
	},
	mediumText: {
		fontSize:
			windowHeight > 700
				? largeScreenFontSizes.medium
				: smallScreenFontSizes.medium
	},
	smallText: {
		fontSize:
			windowHeight > 700
				? largeScreenFontSizes.small
				: smallScreenFontSizes.small,
		letterSpacing: RFValue(-0.1)
	}
});

export { Typography, smallScreenChevronSizes, largeScreenChevronSizes };
