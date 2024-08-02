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

interface StickyTopNavigatorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	setDisplayedTrack: React.Dispatch<React.SetStateAction<number>>;
}

const StickyTopNavigator = ({
	tracks,
	displayedTrack,
	setDisplayedTrack
}: StickyTopNavigatorProps): JSX.Element => {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

	const topChevronPosition = useSharedValue(3);
	const bottomChevronPosition = useSharedValue(3);
	const translationXValue = useSharedValue(500);
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
		setIsExpanded(!isExpanded);
		topChevronPosition.value = withTiming(isExpanded ? 5 : 17);
		bottomChevronPosition.value = withTiming(isExpanded ? 5 : 17);

		// Animate the genre list items with delay
		translationXValue.value = withDelay(
			100,
			withTiming(isExpanded ? -500 : 30)
		);
	};

	const topChevronStyle = useAnimatedStyle(() => {
		return {
			top: topChevronPosition.value
		};
	});

	const bottomChevronStyle = useAnimatedStyle(() => {
		return {
			bottom: bottomChevronPosition.value
		};
	});

	return (
		<View
			style={[
				styles.stickyHeader,
				{
					width: windowWidth,
					backgroundColor: isExpanded
						? tracks[displayedTrack].bgColour
						: "#ffffff00"
				}
			]}>
			<View style={styles.genreNavContainer}>
				{tracks.map((track, index) =>
					!isExpanded ? (
						<TouchableOpacity
							key={index}
							disabled={index === displayedTrack ? true : false}
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
					) : (
						<Animated.View
							style={[
								styles.navGenreTitleContainer,
								{
									transform: [
										{
											translateX: translationXValue
										}
									]
								}
							]}>
							<TouchableOpacity
								key={index}
								style={styles.navGenreTitleButton}
								activeOpacity={0.6}
								disabled={
									index === displayedTrack ? true : false
								}
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
		</View>
	);
};
const styles = StyleSheet.create({
	stickyHeader: {
		display: "flex",
		position: "absolute",
		zIndex: 100,
		flexDirection: "row",
		justifyContent: "space-evenly",
		paddingTop: "20%"
	},
	genreNavContainer: {
		display: "flex",
		flex: 1,
		backgroundColor: "yellow",
		flexGrow: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
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
	navGenreTitleContainer: {
		minWidth: "80%",
		flex: 8,
		flexGrow: 1,
		height: 60,
		marginVertical: 5,
		justifyContent: "center",
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
		fontFamily: "sans-serif",
		fontWeight: "500",
		padding: "8%",
		paddingLeft: 0,
		color: "white",
		fontSize: 28,
		flex: 1,
		flexGrow: 1
	},
	titleContainer: {
		marginTop: "2.5%",
		backgroundColor: "green",
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
