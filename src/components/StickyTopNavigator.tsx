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
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>
					{tracks[displayedTrack].genreName}
				</Text>
			</View>
			<View style={{ flex: 1 }} />
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
		justifyContent: "flex-start"
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
	expandedTrackContainer: {
		width: "100%",
		padding: 10,
		height: 40,
		marginVertical: 5,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center"
	},
	titleContainer: {
		display: "flex",
		justifyContent: "flex-start",
		marginTop: 15,
		marginLeft: "10%",
		height: "auto",
		width: "auto",
		flex: 1,
		alignItems: "center"
	},
	titleText: { fontWeight: "800", color: "white", fontSize: 20 },

	genreText: {
		fontWeight: "500",
		textAlign: "left",
		color: "green"
	}
});

export default StickyTopNavigator;
