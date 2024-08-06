import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const PlaylistItem = ({ track, accentColour }: any) => {
	return (
		<View style={[styles.container]}>
			<Image source={{ uri: track.artwork }} style={styles.artwork} />
			<View style={styles.infoContainer}>
				<Text
					style={[styles.trackName, { color: accentColour }]}
					numberOfLines={1}>
					{track.song_title}
				</Text>
				<Text style={styles.artistName} numberOfLines={1}>
					{track.song_artist}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		marginBottom: "6%",
		width: "90%",
		justifyContent: "flex-start",
		alignItems: "center",
		alignSelf: "flex-start",
		borderBottomColor: "#FFFFFF",
		borderBottomWidth: 1
	},
	artwork: {
		width: 55,
		height: 55,
		borderRadius: 4
	},
	infoContainer: {
		marginHorizontal: 10,
		marginLeft: "7%",
		width: "100%"
	},
	trackName: {
		fontSize: RFValue(15),
		width: "100%",
		fontWeight: "bold"
	},
	artistName: {
		fontSize: RFValue(13),
		fontWeight: "600",
		color: "#ffffff"
	}
});

export default PlaylistItem;
