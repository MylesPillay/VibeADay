import React from "react";
import { StyleSheet, View } from "react-native";
import DailyTrackGallery from "../../components/DailyTrackGallery";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GenrePlaylistComponent, {
	GenrePlaylistParams
} from "@/src/components/GenrePlaylistComponent";

import { RouteProp, useRoute } from "@react-navigation/native";

export default function GenrePlaylistScreen() {
	const route = useRoute() as RouteProp<
		Record<string, GenrePlaylistParams>,
		string
	>;
	return (
		<View style={styles.spacerWrapper}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<GenrePlaylistComponent route={route} />
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
