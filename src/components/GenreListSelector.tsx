import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Dimensions
} from "react-native";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";

import { NavigatorTrack } from "./DailyTrackGallery";

interface GenreListSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	isExpanded: boolean;
	accentColor: string;
	handleGenreListSelection: (index: number) => void;
	nameOpacityStyle: any;
}

const GenreListSelector = ({
	tracks,
	displayedTrack,
	isExpanded,
	handleGenreListSelection,
	nameOpacityStyle
}: GenreListSelectorProps): JSX.Element => {
	const windowHeight = Dimensions.get("window").height;
	const windowWidth = Dimensions.get("window").width;

	return (
		<View
			style={[
				styles.genreNavContainer,
				{
					height: isExpanded ? windowHeight : "auto",
					width: isExpanded ? windowWidth * 0.84 : "auto"
				}
			]}>
			{tracks.map((track, index) => (
				<Animated.View
					key={index}
					style={[styles.navGenreNameContainer, nameOpacityStyle]}>
					<TouchableOpacity
						style={styles.navGenreTitleButton}
						activeOpacity={0.6}
						disabled={index === displayedTrack}
						onPress={() => handleGenreListSelection(index)}>
						<Text
							style={[
								styles.genreText,
								{
									color:
										index ===
										tracks[displayedTrack].trackIndex
											? track.accentColor
											: "#000000"
								}
							]}>
							{track.genreName}
						</Text>
					</TouchableOpacity>
				</Animated.View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	genreNavContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		paddingTop: RFValue(8, 580),
		alignItems: "flex-start",
		top: "3%",
		left: "1%",
		backgroundColor: "blue"
	},
	navGenreNameContainer: {
		height: "auto",
		paddingBottom: RFValue(10, 580),
		width: "100%",
		justifyContent: "flex-start",
		textAlign: "left",
		alignItems: "flex-start",
		alignContent: "flex-start"
	},
	navGenreTitleButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		paddingLeft: 0
	},
	genreText: {
		textAlignVertical: "center",
		textAlign: "left",
		fontFamily: "sans-serif",
		fontWeight: "600",
		fontSize: 28
	}
});

export default GenreListSelector;
