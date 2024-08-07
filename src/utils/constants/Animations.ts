import { SetStateAction } from "react";
import { Dimensions } from "react-native";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { getResponsiveFontSize } from "../helpers/Responsive";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const topChevronPosition = useSharedValue(
	getResponsiveFontSize(7, windowHeight)
);
export const topChevronStyle = useAnimatedStyle(() => {
	return {
		top: topChevronPosition.value
	};
});

// BOTTOM CHEVRON ANIMATION STYLE VARIABLES
export const bottomChevronPosition = useSharedValue(
	getResponsiveFontSize(7, windowHeight)
);
export const bottomChevronStyle = useAnimatedStyle(() => {
	return {
		bottom: bottomChevronPosition.value
	};
});

// ANIMATION TEXT SLIDE IN AND OPACITY FADE IN  STYLE VARIABLES
export const translationXValue = useSharedValue(-200);
export const translationXValueDays = useSharedValue(200);

export const nameOpacityValue = useSharedValue(1);

export const genreNameTextAnimationStyle = useAnimatedStyle(() => {
	return {
		opacity: nameOpacityValue.value,
		zIndex: 500,
		transform: [{ translateX: translationXValue.value }]
	};
});
export const dayListAnimationStyles = useAnimatedStyle(() => {
	return {
		transform: [{ translateX: translationXValueDays.value }]
	};
});

// BOTTOM NAV BAR CHEVRON CONTAINER ANIMATION AND HEIGHT STYLE VARIABLES
export const containerHeight = useSharedValue(windowHeight * 0.1);
// export const containerOpacity = useSharedValue(1);
export const containerStyle = useAnimatedStyle(() => {
	return {
		height: containerHeight.value,
		zIndex: 250
		// opacity: containerOpacity.value
	};
});

export const handleExpandGenreList = (
	isExpanded: boolean,
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>,
	setFlipChevrons: React.Dispatch<React.SetStateAction<boolean | undefined>>
) => {
	if (!isExpanded) {
		setIsExpanded(true);
		setFlipChevrons(true);
		setTimeout(() => {
			topChevronPosition.value = withTiming(
				getResponsiveFontSize(18, windowHeight),
				{
					duration: 100
				}
			);
			bottomChevronPosition.value = withTiming(
				getResponsiveFontSize(17, windowHeight),
				{
					duration: 150
				}
			);
		}, 180);
		containerHeight.value = withTiming(
			windowHeight < 1000 ? windowHeight : windowHeight * 0.8,
			{
				duration: 100
			}
		);
		// containerOpacity.value = withTiming(1, {
		// 	duration: 250
		// });

		nameOpacityValue.value = withTiming(1, {
			duration: 250
		});
		setTimeout(() => {
			translationXValue.value = withTiming(15, {
				duration: 350
			});
		}, 110);
		setTimeout(() => {
			translationXValueDays.value = withTiming(-20, {
				duration: 350
			});
		}, 100);
	} else {
		setFlipChevrons(false);

		topChevronPosition.value = withTiming(
			getResponsiveFontSize(7, windowHeight),
			{
				duration: 150
			}
		);
		bottomChevronPosition.value = withTiming(
			getResponsiveFontSize(5, windowHeight),
			{
				duration: 150
			}
		);
		setTimeout(() => {
			containerHeight.value = withTiming(windowHeight * 0.1, {
				duration: 10
			});
			// containerOpacity.value = withTiming(1, {
			// 	duration: 300
			// });
			setIsExpanded(false);
		}, 350);

		translationXValue.value = withTiming(-200, {
			duration: 350
		});
		translationXValueDays.value = withTiming(200, {
			duration: 350
		});
	}
};
