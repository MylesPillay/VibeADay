import React from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ImageSourcePropType
} from "react-native";

interface DailyTrackCardProps {
	trackName: string;
	artistName: string;
	genreName: string;
	artwork: ImageSourcePropType;
	goToPreviousTrack: () => void;
	goToNextTrack: () => void;
}

const DailyTrackCard = ({
	trackName,
	artistName,
	genreName,
	artwork,
	goToPreviousTrack,
	goToNextTrack
}: DailyTrackCardProps): JSX.Element => {
	console.log(
		trackName,
		artistName,
		genreName,
		artwork,
		"This is the passed in data for each component card "
	);
	function generateBackgroundColorHexCode(genreName: string) {
		switch (genreName) {
			case "Easy Listening":
				return "#BFD7EA";
			case "Garage":
				return "#FFB627";
			case "UK Hip-Hop":
				return "#A5A299";
			case "Techno":
				return "#3A2449";
			case "Drum & Bass":
				return "#C73E1D";
			default:
				return "#FFFFFF"; // Default color if no match is found
		}
	}
	return (
		<View
			style={[
				styles.cardContainer,
				{ backgroundColor: generateBackgroundColorHexCode(genreName) }
			]}>
			<Image source={artwork} style={styles.artwork} />
			<Text style={styles.trackName}>{trackName}</Text>
			<Text style={styles.artistName}>{artistName}</Text>
			<View style={styles.genreContainer}>
				<TouchableOpacity onPress={goToPreviousTrack}>
					<Text style={styles.navArrow}>{"<"}</Text>
				</TouchableOpacity>
				<Text style={styles.genreName}>{genreName}</Text>
				<TouchableOpacity onPress={goToNextTrack}>
					<Text style={styles.navArrow}>{">"}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000", // Adjust the background color as needed
		width: "100%",
		height: "100%"
	},
	artwork: {
		width: "85%",
		height: "50%",
		marginBottom: "10%",
		borderRadius: 10,
		borderColor: "#FFFFFF55",
		borderWidth: 3
	},
	trackName: {
		fontSize: RFValue(22, 580),
		fontWeight: "bold",
		marginBottom: "5%",
		color: "#FFFFFF" // Ensuring text color is visible on the darker background
	},
	artistName: {
		fontSize: RFValue(16, 580),
		fontWeight: "semibold",
		color: "#FFFFFF99",
		marginBottom: "5%"
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
