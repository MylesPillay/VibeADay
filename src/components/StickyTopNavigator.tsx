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
		<View style={[styles.stickyHeader]}>
			<View style={styles.trackContainer}>
				{tracks.map((track, index) =>
					!isExpanded ? (
						<TouchableOpacity
							key={index}
							disabled={index === displayedTrack ? true : false}
							onPress={() => {
								handleGenreSelection(index);
							}}>
							<View style={[styles.genreNavButton]}>
								<View
									style={[
										styles.genreDot,
										{
											backgroundColor:
												displayedTrack === index
													? "#00000025"
													: "#000000"
										}
									]}
								/>
							</View>
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
		top: 30,
		left: 0,
		zIndex: 100,
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		height: "auto"
	},
	trackContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		alignContent: "center"
	},
	genreNavButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		width: 50,
		height: 50
	},
	genreDot: {
		height: 15,
		width: 15,
		borderRadius: 100
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
