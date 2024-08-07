import React from "react";
import {
	View,
	Image,
	StyleSheet,
	ImageSourcePropType,
	Dimensions
} from "react-native";

interface DailyTrackArtworkProps {
	artwork: ImageSourcePropType;
}

const DailyTrackArtwork = ({
	artwork
}: DailyTrackArtworkProps): JSX.Element => {
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
							height: windowHeight * 0.3,
							width: windowHeight * 0.3
						}
					]}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		alignItems: "center",
		paddingVertical: 0
	},
	artworkContainer: {
		alignItems: "flex-start"
	},
	artwork: {
		borderRadius: 7,
		borderWidth: 2
	}
});

export default DailyTrackArtwork;
