import React from "react";
import {
	View,
	Modal,
	StyleSheet,
	TouchableOpacity,
	Text,
	Dimensions
} from "react-native";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigatorTrack } from "./DailyTrackGallery";
import ChevronComponent from "./sticky-top-nav/ChevronComponent";

interface GenreListSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	isExpanded: boolean;
	accentColor: string;
	handleGenreListSelection: (index: number) => void;
	nameOpacityStyle: any;
	handleExpandGenreList: () => void;
	topChevronStyle: any;
	bottomChevronStyle: any;
	flipChevrons: boolean;
}

const GenreListSelector = ({
	tracks,
	displayedTrack,
	isExpanded,
	handleGenreListSelection,
	nameOpacityStyle,
	handleExpandGenreList,
	topChevronStyle,
	bottomChevronStyle,
	flipChevrons
}: GenreListSelectorProps): JSX.Element => {
	const windowHeight = Dimensions.get("window").height;
	const windowWidth = Dimensions.get("window").width;

	return (
		<View
			style={[
				styles.genreNavContainer,
				{ backgroundColor: tracks[displayedTrack]?.bgColour }
			]}>
			<View style={{ marginBottom: "15%" }}>
				{tracks.map((track, index) => (
					<Animated.View
						key={index}
						style={[
							styles.navGenreNameContainer,
							nameOpacityStyle
						]}>
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
			<View style={styles.chevronContainer}>
				<ChevronComponent
					handleExpandGenreList={handleExpandGenreList}
					topChevronStyle={topChevronStyle}
					bottomChevronStyle={bottomChevronStyle}
					flipChevrons={!!flipChevrons}
					accentColor={tracks[displayedTrack]?.accentColor}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	genreNavContainer: {
		display: "flex",
		flexDirection: "row",

		justifyContent: "space-between",
		paddingVertical: "5%",
		paddingHorizontal: "2%",
		paddingTop: RFValue(8, 580),
		alignItems: "flex-end",
		height: "100%"
	},
	navGenreNameContainer: {
		height: "auto",
		paddingBottom: RFValue(10, 580),
		// width: "0%",
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
	},
	chevronContainer: {
		margin: "5%",
		marginBottom: "17%"
	}
});

export default GenreListSelector;
