import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ImageSourcePropType,
	Dimensions
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
	isExpanded: boolean;
}

const DailyTrackCard = ({
	trackName,
	artistName,
	genreName,
	artwork,
	goToPreviousTrack,
	goToNextTrack,
	bgColour,
	isExpanded
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
				{isExpanded && (
					<View
						style={[
							styles.overlay,
							{
								height: windowHeight * 0.3,
								width: windowHeight * 0.3
							}
						]}
					/>
				)}
			</View>
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
		borderRadius: 10,
		borderColor: "#FFFFFF55",
		borderWidth: 3
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "#00000050",
		borderRadius: 10
	},
	trackInfoContainer: {
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "25%",
		paddingVertical: "10%",
		width: "85%",
		borderRadius: 10,
		backgroundColor: "#00000035"
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
