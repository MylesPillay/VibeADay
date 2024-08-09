// constants/styles.ts
import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const smallScreenFontSizes = {
	h1: RFValue(30),
	h2: RFValue(26),
	medium: RFValue(14),
	small: RFValue(9)
};

const smallScreenChevronSizes = {
	headerChevron: RFValue(40),
	collapsibleChevrons: RFValue(40)
};

const Typography = StyleSheet.create({
	h1Text: {
		fontSize: smallScreenFontSizes.h1,
		fontFamily: "sans-serif",
		letterSpacing: RFValue(-0.5),
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
		letterSpacing: RFValue(-0.1)
	}
});

export { Typography, smallScreenChevronSizes };
