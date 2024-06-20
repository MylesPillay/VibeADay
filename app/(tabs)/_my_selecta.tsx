// import { Image, StyleSheet, Platform } from "react-native";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function HomeScreen() {
// 	return (
// 		<ParallaxScrollView
// 			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
// 			headerImage={
// 				<Image
// 					source={require("@/assets/images/partial-react-logo.png")}
// 					style={styles.reactLogo}
// 				/>
// 			}>
// 			<ThemedView style={styles.titleContainer}>
// 				<ThemedText type='title'>Todays Top 5 Picks!</ThemedText>
// 				<HelloWave />
// 			</ThemedView>
// 			<ThemedView style={styles.stepContainer}>
// 				<ThemedText type='subtitle'>Step 1: Try it</ThemedText>
// 			</ThemedView>
// 		</ParallaxScrollView>
// 	);
// }

// const styles = StyleSheet.create({
// 	titleContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		gap: 2
// 	},
// 	stepContainer: {
// 		gap: 2,
// 		marginBottom: 2
// 	},
// 	reactLogo: {
// 		height: 178,
// 		width: 290,
// 		bottom: 0,
// 		left: 0,
// 		position: "absolute"
// 	}
// });
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DailyTrackGallery from "@/components/DailyTrackGallery"; // Make sure the path is correct

export default function HomeScreen() {
	return (
		<View style={styles.spacerWrapper}>
			<ThemedView style={styles.titleContainer}>
				<DailyTrackGallery />
			</ThemedView>
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
