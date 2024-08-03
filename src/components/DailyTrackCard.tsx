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
	isExpanded,
	trackLinks
}: DailyTrackCardProps): JSX.Element => {
	const windowHeight = Dimensions.get("window").height;

	return (
		<View
			style={[
				styles.cardContainer,
				{
					backgroundColor: bgColour,
					height: windowHeight * 0.8,
					paddingTop: windowHeight * 0.2
				}
			]}>
			<View style={styles.artworkContainer}>
				<Image
					source={artwork}
					style={[
						styles.artwork,
						{
							height: windowHeight * 0.3,
							width: windowHeight * 0.3
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
				isExpanded={isExpanded}
				trackLinks={trackLinks}
				bgColour={bgColour}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		alignContent: "center",
		width: "100%"
	},
	artworkContainer: {
		position: "relative"
	},
	artwork: {
		marginBottom: "10%",
		borderRadius: 7,
		borderColor: "#FFFFFF55",
		borderWidth: 3
	},

	trackInfoContainer: {
		justifyContent: "space-around",
		alignItems: "center",
		height: "auto",
		padding: "4%",
		width: "65%",
		borderRadius: 7,
		backgroundColor: "#00000035"
	},
	trackName: {
		fontSize: RFValue(14, 580),
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
		fontSize: RFValue(10, 580),
		letterSpacing: -0.1,
		fontWeight: "600"
	},
	genreContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8
	},
	genreName: {
		fontSize: 24,
		fontWeight: "bold",
		marginHorizontal: 20,
		color: "#FFFFFF"
	},
	navArrow: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFFFFF"
	}
});

export default DailyTrackCard;
