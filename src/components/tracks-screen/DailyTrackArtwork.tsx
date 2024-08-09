import React from "react";
import {
	View,
	Image,
	StyleSheet,
	ImageSourcePropType,
	Dimensions
} from "react-native";
import { RFValue } from "../../utils/helpers/Responsive";

interface DailyTrackArtworkProps {
	artwork: ImageSourcePropType;
}

const windowHeight = Dimensions.get("window").height;
const DailyTrackArtwork = ({
	artwork
}: DailyTrackArtworkProps): JSX.Element => {
	const artworkWidth = windowHeight * 0.3;

	return (
		<View style={[styles.cardContainer]}>
			<View
				style={[
					styles.artworkContainer
					// { marginRight: windowWidth * 0.12 }
				]}>
				<Image
					source={artwork}
					style={[
						styles.artwork,
						{
							height: artworkWidth,
							width: artworkWidth,
							borderColor: "#FFFFFF20"
						}
					]}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		alignItems: "center"
	},
	artworkContainer: {
		alignItems: "flex-start"
	},
	artwork: {
		borderRadius: RFValue(12),
		borderWidth: RFValue(5)
	}
});

export default DailyTrackArtwork;
