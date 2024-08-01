import React from "react";
import { StyleSheet, View } from "react-native";
import DailyTrackGallery from "../../components/DailyTrackGallery";

export default function HomeScreen() {
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
		width: "100%"
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2
	}
});
