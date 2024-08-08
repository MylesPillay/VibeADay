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

export const topChevronPosition = useSharedValue(getResponsiveFontSize(7));
export const topChevronStyle = useAnimatedStyle(() => {
	return {
		top: topChevronPosition.value
	};
});

// BOTTOM CHEVRON ANIMATION STYLE VARIABLES
export const bottomChevronPosition = useSharedValue(5);
export const bottomChevronStyle = useAnimatedStyle(() => {
	return {
		bottom: bottomChevronPosition.value
	};
});

// ANIMATION TEXT SLIDE IN AND OPACITY FADE IN  STYLE VARIABLES
export const translationXValue = useSharedValue(-200);
export const translationXValueDays = useSharedValue(0);

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
export const containerHeight = useSharedValue(40);

export const containerStyle = useAnimatedStyle(() => {
	return {
		height: containerHeight.value,
		zIndex: 250
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
			topChevronPosition.value = withTiming(getResponsiveFontSize(18), {
				duration: 100
			});
			bottomChevronPosition.value = withTiming(
				getResponsiveFontSize(17),
				{
					duration: 150
				}
			);
		}, 180);
		containerHeight.value = withTiming(windowHeight * 0.45, {
			duration: 200
		});
		nameOpacityValue.value = withTiming(1, {
			duration: 250
		});
		translationXValue.value = withTiming(15, {
			duration: 450
		});
		translationXValueDays.value = withTiming(-20, {
			duration: 450
		});
	} else {
		setIsExpanded(false);
		setFlipChevrons(false);
		containerHeight.value = withTiming(22, { duration: 10 });
		setTimeout(() => {
			topChevronPosition.value = withTiming(getResponsiveFontSize(7), {
				duration: 150
			});
			bottomChevronPosition.value = withTiming(getResponsiveFontSize(5), {
				duration: 150
			});
		}, 11);

		translationXValue.value = withTiming(-200, {
			duration: 150
		});
		translationXValueDays.value = withTiming(200, {
			duration: 150
		});
	}
};
