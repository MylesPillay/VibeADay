// import React from "react";
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import {
// 	View,
// 	Text,
// 	Image,
// 	StyleSheet,
// 	TouchableOpacity,
// 	ImageSourcePropType
// } from "react-native";

// interface DailyTrackCardProps {
// 	trackName: string;
// 	artistName: string;
// 	genreName: string;
// 	artwork: ImageSourcePropType;
// 	goToPreviousTrack: () => void;
// 	goToNextTrack: () => void;
// }

// const DailyTrackCard = ({
// 	trackName,
// 	artistName,
// 	genreName,
// 	artwork,
// 	goToPreviousTrack,
// 	goToNextTrack
// }: DailyTrackCardProps): JSX.Element => {
// 	console.log(
// 		trackName,
// 		artistName,
// 		genreName,
// 		artwork,
// 		"This is the passed in data for each component card "
// 	);
// 	function generateBackgroundColorHexCode(genreName: string) {
// 		switch (genreName) {
// 			case "Easy Listening":
// 				return "#BFD7EA";
// 			case "Garage":
// 				return "#FFB627";
// 			case "UK Hip-Hop":
// 				return "#A5A299";
// 			case "Techno":
// 				return "#3A2449";
// 			case "Drum & Bass":
// 				return "#C73E1D";
// 			default:
// 				return "#FFFFFF"; // Default color if no match is found
// 		}
// 	}
// 	function generateTextColorHexCode(genreName: string) {
// 		switch (genreName) {
// 			case "Easy Listening":
// 				return "#6495ED"; // Dark Slate Gray for a soft blue background
// 			case "Garage":
// 				return "#C73E1D"; // Very dark gray (almost black) for bright orange
// 			case "UK Hip-Hop":
// 				return "#3A2449"; // Lavender for dark gray background
// 			case "Techno":
// 				return "#40E0D0"; // Thistle (light purple) for dark purple background
// 			case "Drum & Bass":
// 				return "#FFD700"; // Gold for dark red background
// 			default:
// 				return "#778899"; // Light Slate Gray, neutral and visible on many backgrounds
// 		}
// 	}
// 	return (
// 		<View
// 			style={[
// 				styles.cardContainer,
// 				{ backgroundColor: generateBackgroundColorHexCode(genreName) }
// 			]}>
// 			<Image source={artwork} style={styles.artwork} />
// 			<View style={styles.trackInfoContainer}>

// 			<Text style={styles.trackName}>{trackName}</Text>
// 			<Text style={styles.artistName}>{artistName}</Text>
// 			<View style={styles.genreContainer}>
// 				<TouchableOpacity onPress={goToPreviousTrack}>
// 					<Text style={styles.navArrow}>{"<"}</Text>
// 				</TouchableOpacity>
// 				<Text style={[styles.genreName,{color: generateTextColorHexCode(genreName)}]}>{genreName}</Text>
// 				<TouchableOpacity onPress={goToNextTrack}>
// 					<Text style={styles.navArrow}>{">"}</Text>
// 				</TouchableOpacity>
// 				</View>
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	cardContainer: {
// 		flex: 1,
// 		padding: 16,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "#000", // Adjust the background color as needed
// 		width: "100%",
// 		height: "100%"
// 	},
// 	artwork: {
// 		width: "85%",
// 		height: "50%",
// 		marginBottom: "10%",
// 		borderRadius: 10,
// 		borderColor: "#FFFFFF55",
// 		borderWidth: 3
// 	},
// 	trackInfoContainer: { display: 'flex', flexDirection: 'column',  justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center', height: '25%', paddingVertical: '10%', width: '85%', borderRadius: 10, backgroundColor: '#00000055'},

// 	trackName: {
// 		fontSize: RFValue(22, 580),
// 		fontWeight: "bold",
// 		marginBottom: "5%",
// 		color: "#FFFFFF" // Ensuring text color is visible on the darker background
// 	},
// 	artistName: {
// 		fontSize: RFValue(16, 580),
// 		fontWeight: "semibold",
// 		color: "#FFFFFF",
// 		marginBottom: "5%"
// 	},
// 	genreContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		marginTop: 8
// 	},
// 	genreName: {
// 		fontSize: 24,
// 		fontWeight: "bold",
// 		marginHorizontal: 20,
// 		// color: "#FFFFFF"
// 	},
// 	navArrow: {
// 		fontSize: 24,
// 		fontWeight: "bold",
// 		color: "#FFFFFF"
// 	}
// });

// export default DailyTrackCard;
import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ImageSourcePropType
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface DailyTrackCardProps {
	trackName: string;
	artistName: string;
	genreName: string;
	artwork: ImageSourcePropType;
	goToPreviousTrack: () => void;
	goToNextTrack: () => void;
	bgColour: string;
}

const DailyTrackCard = ({
	trackName,
	artistName,
	genreName,
	artwork,
	goToPreviousTrack,
	goToNextTrack,
	bgColour
}: DailyTrackCardProps): JSX.Element => {
	return (
		<View style={[styles.cardContainer, { backgroundColor: bgColour }]}>
			<Image source={artwork} style={styles.artwork} />
			<View style={styles.trackInfoContainer}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
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
	trackInfoContainer: {
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "25%",
		paddingVertical: "10%",
		width: "85%",
		borderRadius: 10,
		backgroundColor: "#00000055"
	},
	trackName: {
		fontSize: RFValue(22, 580),
		fontWeight: "bold",
		marginBottom: "5%",
		color: "#FFFFFF"
	},
	artistName: {
		fontSize: RFValue(16, 580),
		fontWeight: "semibold",
		color: "#FFFFFF",
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
