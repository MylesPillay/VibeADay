import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const PlaylistItem = ({ track }: any) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: track.artwork }} style={styles.artwork} />
			<View style={styles.infoContainer}>
				<Text style={styles.trackName} numberOfLines={1}>
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
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc"
	},
	artwork: {
		width: 50,
		height: 50,
		borderRadius: 4
	},
	infoContainer: {
		marginLeft: 10,
		flex: 1
	},
	trackName: {
		fontSize: RFValue(14),
		fontWeight: "bold"
	},
	artistName: {
		fontSize: RFValue(12),
		color: "#888"
	}
});

export default PlaylistItem;
