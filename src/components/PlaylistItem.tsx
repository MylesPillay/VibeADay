import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const PlaylistItem = ({ track, accentColor }: any) => {
	return (
		<View
			style={[
				styles.container,
				{ borderBlockColor: accentColor + "99" }
			]}>
			<Image source={{ uri: track.artwork }} style={styles.artwork} />
			<View style={styles.infoContainer}>
				<Text
					style={[styles.trackName, { color: accentColor }]}
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
		marginBottom: "2%",
		width: "90%",
		justifyContent: "flex-start",
		alignItems: "center",
		alignSelf: "flex-start",
		borderBottomWidth: 1,
		paddingVertical: "2%"
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
		marginBottom: "2%",
		fontWeight: "bold"
	},
	artistName: {
		fontSize: RFValue(13),
		fontWeight: "600",
		color: "#ffffff"
	}
});

export default PlaylistItem;
