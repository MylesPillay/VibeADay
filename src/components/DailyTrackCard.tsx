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
	trackLinks
}: DailyTrackCardProps): JSX.Element => {
	const windowHeight = Dimensions.get("window").height;
	const windowWidth = Dimensions.get("window").width;

	return (
		<View style={[styles.cardContainer]}>
			<View
				style={[
					styles.artworkContainer,
					{ marginRight: windowWidth * 0.12 }
				]}>
				<Image
					source={artwork}
					style={[
						styles.artwork,
						{
							borderColor: "#FFFFFF65",
							height: windowHeight * 0.28,
							width: windowHeight * 0.28
						}
					]}
				/>
			</View>
			{/* <View style={styles.trackInfoContainer}>
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
			/> */}
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		// backgroundColor: "#00000035",
		alignItems: "center",
		paddingVertical: "4%"
	},
	artworkContainer: {
		alignItems: "flex-start"
	},
	artwork: {
		borderRadius: 7,
		borderWidth: 2
	}
});

export default DailyTrackCard;
