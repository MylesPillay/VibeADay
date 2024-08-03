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
				accentColor={accentColor}
			/>
			<View style={styles.genreChevronContainer}>
				<MaterialCommunityIcons
					name={"chevron-right"}
					color={accentColor}
					size={45}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		justifyContent: "flex-start",
		width: "100%"
	},
	artworkContainer: {
		position: "relative",
		alignItems: "center"
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
		padding: "4%",
		width: "90%",
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

	genreChevronContainer: {
		alignItems: "flex-end",
		alignSelf: "flex-end",
		width: "10%",
		marginRight: "5%"
	}
});

export default DailyTrackCard;
