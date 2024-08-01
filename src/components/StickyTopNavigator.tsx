import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigatorTrack } from "./DailyTrackGallery";

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

	function handlePress(index: number): void {
		throw new Error("Function not implemented.");
	}

	return (
		<View
			style={[
				styles.stickyHeader,
				{ backgroundColor: tracks[displayedTrack]?.bgColour }
			]}>
			{tracks.map((track, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => {
						handlePress(index);
					}}>
					{!isExpanded ? (
						<View
							style={[
								styles.trackContainer,
								{ backgroundColor: track.bgColour }
							]}
						/>
					) : (
						<View
							style={[
								styles.expandedTrackContainer,
								{
									backgroundColor: tracks[index].bgColour
								}
							]}>
							<Text style={styles.genreText}>
								{track.genreName}
							</Text>
						</View>
					)}
				</TouchableOpacity>
			))}
		</View>
	);
};
const styles = StyleSheet.create({
	stickyHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		zIndex: 1000,
		padding: 10,
		backgroundColor: "#fff"
	},
	trackContainer: {
		width: 50,
		height: 50,
		marginVertical: 5
	},
	expandedTrackContainer: {
		width: "100%",
		padding: 10,
		marginVertical: 5,
		justifyContent: "center"
	},
	genreText: {
		fontWeight: "500",
		textAlign: "left"
	}
});

export default StickyTopNavigator;
