import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ImageSourcePropType,
	Dimensions
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import LinksComponent from "./LinksComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface DailyTrackCardProps {
	trackName: string;
	artistName: string;
	genreName: string;
	artwork: ImageSourcePropType;
	goToPreviousTrack: () => void;
	goToNextTrack: () => void;
	bgColour: string;
	accentColor: string;
	isExpanded: boolean;
	trackLinks: TrackLinksProps;
}
export interface TrackLinksProps {
	spotifyURL?: string;
	soundcloudURL?: string;
	bandcampURL?: string;
	appleMusicURL?: string;
	facebookURL?: string;
	instagramURL?: string;
}
const DailyTrackCard = ({
	trackName,
	artistName,
	artwork,
	bgColour,
	accentColor,
	// isExpanded,
	trackLinks
}: DailyTrackCardProps): JSX.Element => {
	const windowHeight = Dimensions.get("window").height;

	return (
		<View style={[styles.cardContainer]}>
			<View style={styles.artworkContainer}>
				<Image
					source={artwork}
					style={[
						styles.artwork,
						{
							height: windowHeight * 0.28,
							width: windowHeight * 0.28
						}
					]}
				/>
			</View>
			<View style={styles.trackInfoContainer}>
				<Text style={styles.trackName}>{trackName}</Text>
				<View style={styles.artistNameContainer}>
					<Text style={[styles.artistName, { color: accentColor }]}>
						{artistName}
					</Text>
				</View>
			</View>
			<LinksComponent
				trackLinks={trackLinks}
				bgColour={bgColour}
				accentColor={accentColor}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		display: "flex",
		zIndex: 10,
		padding: 0,
		maxWidth: "100%",
		backgroundColor: "#00000035",

		width: "100%"
	},
	artworkContainer: {
		position: "relative",
		alignItems: "flex-start"
	},
	artwork: {
		marginBottom: "10%",
		borderRadius: 7,
		borderColor: "#FFFFFF55",
		borderWidth: 3
	},

	trackInfoContainer: {
		height: "auto",
		alignSelf: "center",

		borderRadius: 7,
		backgroundColor: "#00000035"
	},
	trackName: {
		fontSize: RFValue(13, 580),
		letterSpacing: -0.1,
		fontWeight: "600",
		marginBottom: "3%",
		textAlign: "center",
		color: "#FFFFFF"
	},
	artistNameContainer: {
		display: "flex",

		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "center"
	},
	artistName: {
		fontSize: RFValue(11, 580),
		letterSpacing: -0.1,
		fontWeight: "600"
	}
});

export default DailyTrackCard;
