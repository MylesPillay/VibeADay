import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigatorTrack } from "./DailyTrackGallery";

interface GenreTitleProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
}

const GenreTitleComponent = ({ tracks, displayedTrack }: GenreTitleProps) => {
	return (
		<View style={styles.titleContainer}>
			<Text
				style={[
					styles.titleText,
					{ color: tracks[displayedTrack]?.accentColor }
				]}>
				{tracks[displayedTrack]?.genreName}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: "2.5%",
		justifyContent: "flex-start",
		textAlign: "center",

		alignItems: "center",
		alignContent: "center",
		flex: 1
	},
	titleText: {
		fontWeight: "600",
		fontFamily: "sans-serif",
		letterSpacing: -0.5,
		fontSize: 32,
		textAlign: "center"
	}
});

export default GenreTitleComponent;
