// utils/responsive.ts
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const baseScreenHeight = 667;
const baseScreenWidth = 375;
const screenSurfaceArea = SCREEN_WIDTH * SCREEN_HEIGHT;
const baseScreenSurfaceArea = baseScreenWidth * baseScreenHeight;
// console.log(
// 	SCREEN_HEIGHT,
// 	"this is the screen height",
// 	SCREEN_WIDTH,
// 	"this is the screen width"
// );
const getResponsiveFontSize = (size: number, windowHeight: number) => {
	const smallScreenRation = (size / windowHeight) * 650;

	const textRatio = (size / windowHeight) * 980;
	return Math.round(SCREEN_WIDTH < 400 ? smallScreenRation : textRatio);
};

const getResponsiveLinksComponentIconSizes = (
	windowHeight: number,
	bandcampIcon?: boolean
) => {
	const standardIconSize = RFValue(45);

	const ratio = (standardIconSize / windowHeight) * 250;
	const bandcampRatio = (RFValue(38) / windowHeight) * 250;
	const bandcampSize = bandcampIcon ? bandcampRatio : ratio;
	const size = Math.round(bandcampIcon ? bandcampSize : ratio);
	return size;
};

export { getResponsiveFontSize, getResponsiveLinksComponentIconSizes };
