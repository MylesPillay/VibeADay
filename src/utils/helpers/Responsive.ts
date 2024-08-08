// utils/responsive.ts
import { Dimensions } from "react-native";

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
const getResponsiveFontSize = (size: number) => {
	console.log(
		SCREEN_HEIGHT,
		"this is the screen height",
		SCREEN_WIDTH,
		"this is the screen width"
	);
	const ratio = screenSurfaceArea / baseScreenSurfaceArea;
	const newSize = size * ratio;
	return Math.round(newSize);
};

export { getResponsiveFontSize };
