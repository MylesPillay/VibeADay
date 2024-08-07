import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import DailyTrackGallery from "../../components/DailyTrackGallery";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;
	return (
		<View
			style={[
				styles.spacerWrapper,
				{ width: windowWidth, height: windowHeight }
			]}>
			<GestureHandlerRootView>
				<DailyTrackGallery />
			</GestureHandlerRootView>
		</View>
	);
}

const styles = StyleSheet.create({
	spacerWrapper: {
		display: "flex",
		alignContent: "center"
	}
});
