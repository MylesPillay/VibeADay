import React from "react";
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
	return (
		<View style={styles.cardContainer}>
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
		backgroundColor: "white",
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	artwork: {
		width: 150,
		height: 150,
		marginBottom: 8
	},
	trackName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4
	},
	artistName: {
		fontSize: 16,
		color: "#666"
	},
	genreContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8
	},
	genreName: {
		fontSize: 24,
		fontWeight: "bold",
		marginHorizontal: 20
	},
	navArrow: {
		fontSize: 24,
		fontWeight: "bold"
	}
});

export default DailyTrackCard;
