import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigatorTrack } from "../DailyTrackGallery";
import ChevronComponent from "./ChevronComponent";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming
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
											height: 14 - (index + 2),
											width: 14 - (index + 2),
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
						<TouchableOpacity
							key={index}
							activeOpacity={0.6}
							disabled={index === displayedTrack ? true : false}
							onPress={() => {
								handleGenreListSelection(index);
							}}>
							<View
								style={[
									styles.expandedGenreNavContainer,
									{
										backgroundColor:
											tracks[displayedTrack].bgColour
									}
								]}>
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
							</View>
						</TouchableOpacity>
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
		justifyContent: "space-between",
		width: "100%",
		height: "100%",
		paddingTop: "20%"
	},
	genreNavContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		top: "28%",
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
	expandedGenreNavContainer: {
		width: "100%",
		padding: 10,
		height: 40,
		marginVertical: 5,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center"
	},
	titleContainer: {
		marginTop: "2.5%",
		textAlign: "center",
		left: "2%",
		height: "auto",
		width: "auto",
		alignItems: "center"
	},
	titleText: {
		fontWeight: "800",
		color: "white",
		fontSize: 30,
		textAlign: "center"
	},

	genreText: {
		fontWeight: "800",
		fontSize: 20,
		textAlign: "left",
		color: "emerald"
	}
});

export default StickyTopNavigator;
