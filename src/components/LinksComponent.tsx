import React from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TrackLinksProps } from "./DailyTrackCard";

const LinksComponent = ({
	isExpanded,
	trackLinks,
	bgColour
}: {
	isExpanded: boolean;
	trackLinks: TrackLinksProps;
	bgColour: string;
}): JSX.Element => {
	const handleLinkPress = (url: string) => {
		Linking.openURL(url)
			.then(() => {
				console.log(`Opened URL: ${url}`);
			})
			.catch((err) => {
				console.error("An error occurred", err);
			});
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				disabled={!trackLinks?.spotifyURL}
				onPress={() => handleLinkPress(trackLinks?.spotifyURL ?? "")}>
				<MaterialCommunityIcons
					name='spotify'
					size={32}
					color={!trackLinks?.spotifyURL ? "#00000055" : "#EBCB16"}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.soundcloudURL}
				onPress={() => handleLinkPress(trackLinks.soundcloudURL ?? "")}>
				<MaterialCommunityIcons
					name='soundcloud'
					size={32}
					color={!trackLinks?.soundcloudURL ? "#00000055" : "#EBCB16"}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.bandcampURL}
				onPress={() => handleLinkPress(trackLinks.bandcampURL ?? "")}>
				<View
					style={[
						styles.bandcampIconContainer,
						{
							backgroundColor: !trackLinks?.spotifyURL
								? "#00000055"
								: "#EBCB16"
						}
					]}>
					<View
						style={[
							styles.bandcampIcon,
							{ backgroundColor: bgColour }
						]}></View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.appleMusicURL}
				onPress={() => handleLinkPress(trackLinks.appleMusicURL ?? "")}>
				<MaterialCommunityIcons
					name='apple'
					size={32}
					color={!trackLinks?.appleMusicURL ? "#00000055" : "#EBCB16"}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.instagramURL}
				onPress={() => handleLinkPress(trackLinks.instagramURL ?? "")}>
				<MaterialCommunityIcons
					name='instagram'
					size={32}
					color={!trackLinks?.instagramURL ? "#00000055" : "#EBCB16"}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.facebookURL}
				onPress={() => handleLinkPress(trackLinks.facebookURL ?? "")}>
				<MaterialCommunityIcons
					name='facebook'
					size={32}
					color={!trackLinks?.facebookURL ? "#00000055" : "#EBCB16"}
				/>
			</TouchableOpacity>
		</View>
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
		// backgroundColor: "#EBCB16",
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
