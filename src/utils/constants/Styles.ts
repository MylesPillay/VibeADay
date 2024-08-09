// constants/styles.ts
import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const windowHWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const smallScreenFontSizes = {
	h1: RFValue(30, windowHeight),
	h2: RFValue(26, windowHeight),
	medium: RFValue(14, windowHeight),
	small: RFValue(9, windowHeight)
};

const smallScreenChevronSizes = {
	headerChevron: RFValue(40, windowHeight),
	collapsibleChevrons: RFValue(40, windowHeight)
};

const Typography = StyleSheet.create({
	h1Text: {
		fontSize: smallScreenFontSizes.h1,
		fontFamily: "sans-serif",
		letterSpacing: RFValue(-0.5, windowHeight),
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
		letterSpacing: RFValue(-0.1, windowHeight)
	}
});

export { Typography, smallScreenChevronSizes };
