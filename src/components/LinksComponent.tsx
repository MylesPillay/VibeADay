import React from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const LinksComponent = ({
	isExpanded,
	bgColour
}: {
	isExpanded: boolean;
	bgColour: string;
}): JSX.Element => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => handleLinkPress("spotify")}>
				<MaterialCommunityIcons
					name='spotify'
					size={32}
					color='goldenrod'
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleLinkPress("soundcloud")}>
				<MaterialCommunityIcons
					name='soundcloud'
					size={32}
					color='goldenrod'
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleLinkPress("bandcamp")}>
				<View style={styles.bandcampIconContainer}>
					<View
						style={[
							styles.bandcampIcon,
							{ backgroundColor: bgColour }
						]}></View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleLinkPress("apple-music")}>
				<MaterialCommunityIcons
					name='apple'
					size={32}
					color='goldenrod'
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleLinkPress("apple-music")}>
				<MaterialCommunityIcons
					name='instagram'
					size={32}
					color='goldenrod'
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleLinkPress("apple-music")}>
				<MaterialCommunityIcons
					name='facebook'
					size={32}
					color='goldenrod'
				/>
			</TouchableOpacity>
		</View>
	);
};

const handleLinkPress = (platform: string) => {
	let url = "";
	switch (platform) {
		case "spotify":
			url = "https://www.spotify.com";
			break;
		case "soundcloud":
			url = "https://www.soundcloud.com";
			break;
		case "bandcamp":
			url = "https://www.bandcamp.com";
			break;
		case "apple-music":
			url = "https://www.apple.com/music";
			break;
	}
	Linking.openURL(url).catch((err) =>
		console.error("An error occurred", err)
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-evenly",
		minWidth: "65%",
		marginVertical: "5%",
		height: "auto",
		padding: "4%",
		paddingHorizontal: "1%",
		borderRadius: 7,
		backgroundColor: "#00000035"
	},
	bandcampIconContainer: {
		width: 25,
		height: 25,
		// backgroundColor: "#00A0D8",
		backgroundColor: "goldenrod",
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center"
	},
	bandcampIcon: {
		width: 10,
		height: 9,
		// backgroundColor: "white",

		transform: [{ skewX: "-20deg" }]
	}
});

export default LinksComponent;
