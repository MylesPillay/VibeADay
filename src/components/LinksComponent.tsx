import React from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getResponsiveFontSize } from "../utils/helpers/Responsive";

export interface TrackLinksProps {
	spotifyURL?: string;
	soundcloudURL?: string;
	bandcampURL?: string;
	appleMusicURL?: string;
	facebookURL?: string;
	instagramURL?: string;
}

const LinksComponent = ({
	trackLinks,
	bgColor,
	accentColor
}: {
	trackLinks: TrackLinksProps;
	bgColor: string;
	accentColor: string;
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
					size={getResponsiveFontSize(45)}
					color={!trackLinks?.spotifyURL ? "#00000055" : accentColor}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.soundcloudURL}
				onPress={() => handleLinkPress(trackLinks.soundcloudURL ?? "")}>
				<MaterialCommunityIcons
					name='soundcloud'
					size={getResponsiveFontSize(50)}
					color={
						!trackLinks?.soundcloudURL ? "#00000055" : accentColor
					}
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
								: accentColor
						}
					]}>
					<View
						style={[
							styles.bandcampIcon,
							{ backgroundColor: bgColor }
						]}></View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.appleMusicURL}
				onPress={() => handleLinkPress(trackLinks.appleMusicURL ?? "")}>
				<MaterialCommunityIcons
					name='apple'
					size={getResponsiveFontSize(50)}
					color={
						!trackLinks?.appleMusicURL ? "#00000055" : accentColor
					}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.instagramURL}
				onPress={() => handleLinkPress(trackLinks.instagramURL ?? "")}>
				<MaterialCommunityIcons
					name='instagram'
					size={getResponsiveFontSize(45)}
					color={
						!trackLinks?.instagramURL ? "#00000055" : accentColor
					}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!trackLinks?.facebookURL}
				onPress={() => handleLinkPress(trackLinks.facebookURL ?? "")}>
				<MaterialCommunityIcons
					name='facebook'
					size={getResponsiveFontSize(51)}
					color={!trackLinks?.facebookURL ? "#00000055" : accentColor}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		alignSelf: "center",
		padding: getResponsiveFontSize(3),
		paddingHorizontal: getResponsiveFontSize(1),
		borderRadius: getResponsiveFontSize(12),
		backgroundColor: "#00000025",
		flexDirection: "row",
		flexWrap: "wrap",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	bandcampIconContainer: {
		width: getResponsiveFontSize(38),
		height: getResponsiveFontSize(38),
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center"
	},
	bandcampIcon: {
		width: getResponsiveFontSize(16),
		height: getResponsiveFontSize(16),
		transform: [{ skewX: "-20deg" }]
	}
});

export default LinksComponent;
