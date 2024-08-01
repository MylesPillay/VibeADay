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

	function handleGenreSelection(selectedTrack: number): void {
		return setDisplayedTrack(selectedTrack);
	}
	function handleExpandGenreList(isExpanded: boolean): void {
		return setIsExpanded(!isExpanded);
	}

	return (
		<View
			style={[
				styles.stickyHeader,
				{ backgroundColor: tracks[displayedTrack]?.bgColour }
				// { backgroundColor: "pink" }
			]}>
			<View style={styles.trackContainer}>
				{tracks.map((track, index) =>
					!isExpanded ? (
						<TouchableOpacity
							key={index}
							disabled={index === displayedTrack ? true : false}
							onPress={() => {
								handleGenreSelection(index);
							}}>
							<View
								style={[
									styles.genreNavSquare,
									{ backgroundColor: track.bgColour }
								]}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							key={index}
							disabled={index === displayedTrack ? true : false}
							onPress={() => {
								handleGenreSelection(index);
							}}>
							<View
								style={[
									styles.expandedTrackContainer,
									{
										backgroundColor:
											tracks[displayedTrack].bgColour
									}
								]}>
								<Text style={styles.genreText}>
									{track.genreName}
								</Text>
							</View>
						</TouchableOpacity>
					)
				)}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	stickyHeader: {
		display: "flex",
		top: 0,
		left: 0,
		zIndex: 100,
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		padding: 10
	},
	trackContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		alignContent: "center"
	},
	genreNavSquare: {
		width: 50,
		height: 50
	},
	expandedTrackContainer: {
		width: "100%",
		padding: 10,
		height: 40,
		marginVertical: 5,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center"
	},
	genreText: {
		fontWeight: "500",
		textAlign: "left",
		color: "green"
	}
});

export default StickyTopNavigator;
