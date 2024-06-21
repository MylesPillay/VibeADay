import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import DailyTrackGallery from "@/components/DailyTrackGallery";

interface Track {
	created_at: string;
	song_title: string;
	song_artist: string;
	genre: string;
	spotify_url: string;
	soundcloud_url: string;
	artwork: string;
}

export default function HomeScreen() {
	// const tracks = getDailyTracks();

	return (
		<View style={styles.spacerWrapper}>
			<DailyTrackGallery />
		</View>
	);
}

const styles = StyleSheet.create({
	spacerWrapper: {
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: "100%",
		width: "auto"
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2
	},
	stepContainer: {
		gap: 2,
		marginBottom: 2
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute"
	}
});
