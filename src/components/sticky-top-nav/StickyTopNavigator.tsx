import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Dimensions
} from "react-native";
import { NavigatorTrack } from "../DailyTrackGallery";
import ChevronComponent from "./ChevronComponent";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	withDelay
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";

interface StickyTopNavigatorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	setDisplayedTrack: React.Dispatch<React.SetStateAction<number>>;
	isExpanded: boolean;
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const StickyTopNavigator = ({
	tracks,
	displayedTrack,
	setDisplayedTrack,
	isExpanded,
	setIsExpanded
}: StickyTopNavigatorProps): JSX.Element => {
	const topChevronPosition = useSharedValue(RFValue(5, 580));
	const bottomChevronPosition = useSharedValue(3);
	const translationXValue = useSharedValue(-200);
	const nameOpacityValue = useSharedValue(0);
	const backgroundOpacityValue = useSharedValue(0);
	const dotOpacityValue = useSharedValue(0);
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

	const handleGenreListSelection = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
		handleExpandGenreList();
	};
	const handleGenreDotSelect = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
	};

	const handleExpandGenreList = () => {
		if (isExpanded) {
			// When collapsing, perform animations first
			topChevronPosition.value = withTiming(RFValue(5, 580));
			bottomChevronPosition.value = withTiming(RFValue(5, 580));
			translationXValue.value = withTiming(-200, { duration: 300 });
			backgroundOpacityValue.value = withTiming(1, { duration: 100 });
			dotOpacityValue.value = withTiming(1, { duration: 150 });
			nameOpacityValue.value = withTiming(0, { duration: 150 });

			// Set isExpanded to false after a delay to allow animations to complete
			setTimeout(() => {
				setIsExpanded(false);
			}, 300);
		} else {
			// When expanding, set isExpanded to true first
			setIsExpanded(true);
			topChevronPosition.value = withTiming(RFValue(12, 580));
			bottomChevronPosition.value = withTiming(RFValue(12, 580));
			backgroundOpacityValue.value = withTiming(1, {
				duration: 100
			});
			translationXValue.value = withTiming(15, { duration: 400 });
			dotOpacityValue.value = withTiming(0, { duration: 100 });
			nameOpacityValue.value = withTiming(1, { duration: 100 });
		}
	};

	const topChevronStyle = useAnimatedStyle(() => {
		return {
			top: topChevronPosition.value
		};
	});
	const backgroundOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: backgroundOpacityValue.value
		};
	});

	const bottomChevronStyle = useAnimatedStyle(() => {
		return {
			bottom: bottomChevronPosition.value
		};
	});

	const dotOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: dotOpacityValue.value
		};
	});

	const nameOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: nameOpacityValue.value,
			transform: [{ translateX: translationXValue.value }]
		};
	});

	return (
		<Animated.View
			style={[
				styles.stickyHeader,
				{
					backgroundColor: tracks[displayedTrack]?.bgColour,
					opacity: backgroundOpacityValue.value,
					width: windowWidth,
					paddingHorizontal: windowWidth * 0.02,
					height: isExpanded
						? windowHeight * 0.9
						: windowHeight * 0.15
				}
			]}>
			<View
				style={[
					styles.genreNavContainer,
					{
						height: isExpanded ? windowHeight : "auto",
						width: isExpanded ? windowWidth * 0.84 : "auto"
					}
				]}>
				{tracks.map((track, index) =>
					!isExpanded ? (
						<Animated.View
							key={index}
							style={[styles.genreNavButton, dotOpacityStyle]}>
							<TouchableOpacity
								key={index}
								disabled={index === displayedTrack}
								onPress={() => {
									handleGenreDotSelect(index);
								}}>
								<View style={[styles.genreNavButton]}>
									<View
										style={[
											styles.genreDot,
											{
												height:
													index === 0
														? 16
														: 15 - (index + 2),
												width:
													index === 0
														? 16
														: 15 - (index + 2),
												borderColor:
													index === displayedTrack
														? "goldenrod"
														: "none",
												borderWidth:
													index === displayedTrack
														? 3
														: 0,
												backgroundColor:
													displayedTrack === index
														? "#00000045"
														: "#000000"
											}
										]}
									/>
								</View>
							</TouchableOpacity>
						</Animated.View>
					) : (
						<Animated.View
							key={index}
							style={[
								styles.navGenreNameContainer,
								nameOpacityStyle
							]}>
							<TouchableOpacity
								style={styles.navGenreTitleButton}
								activeOpacity={0.6}
								disabled={index === displayedTrack}
								onPress={() => {
									handleGenreListSelection(index);
								}}>
								<Text
									style={[
										styles.genreText,
										{
											color:
												index ===
												tracks[displayedTrack]
													.trackIndex
													? "#FFFFFF"
													: "#000000"
										}
									]}>
									{track.genreName}
								</Text>
							</TouchableOpacity>
						</Animated.View>
					)
				)}
			</View>
			{isExpanded ? (
				<></>
			) : (
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>
						{tracks[displayedTrack].genreName}
					</Text>
				</View>
			)}

			<ChevronComponent
				isExpanded={isExpanded}
				handleExpandGenreList={handleExpandGenreList}
				topChevronStyle={topChevronStyle}
				bottomChevronStyle={bottomChevronStyle}
			/>
		</Animated.View>
	);
};
const styles = StyleSheet.create({
	stickyHeader: {
		display: "flex",
		position: "absolute",
		backgroundColor: "blue",
		zIndex: 100,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: "15%"
	},
	genreNavContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		paddingTop: RFValue(8, 580),
		alignItems: "flex-start",
		top: "3%",
		left: "1%"
	},
	genreNavButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		width: 40,
		height: 40
	},
	genreDot: {
		borderRadius: 100
	},
	navGenreNameContainer: {
		height: "auto",
		paddingBottom: RFValue(10, 580),
		width: "100%",
		justifyContent: "flex-start",
		textAlign: "left",
		alignItems: "flex-start",
		alignContent: "flex-start"
	},
	navGenreTitleButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		paddingLeft: 0
	},
	genreText: {
		textAlignVertical: "center",
		textAlign: "left",
		fontFamily: "sans-serif",
		fontWeight: "600",
		fontSize: 28
	},
	titleContainer: {
		marginTop: "2.5%",
		justifyContent: "center",
		textAlign: "center",
		height: "auto",
		width: "auto",
		alignItems: "center"
	},
	titleText: {
		fontWeight: "600",
		fontFamily: "sans-serif",
		color: "white",
		fontSize: 30,
		textAlign: "center"
	}
});

export default StickyTopNavigator;
