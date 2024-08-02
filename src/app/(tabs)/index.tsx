import React from "react";
import { StyleSheet, View } from "react-native";
import DailyTrackGallery from "../../components/DailyTrackGallery";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
	return (
		<View style={styles.spacerWrapper}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<DailyTrackGallery />
			</GestureHandlerRootView>
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
