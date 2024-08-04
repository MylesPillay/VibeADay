import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";

import { NavigatorTrack } from "./DailyTrackGallery";
interface GenreDotSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	setDisplayedTrack: React.Dispatch<React.SetStateAction<number>>;
	// isExpanded: boolean;
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
	accentColor: string;
	handleGenreListSelection: (index: number) => void;
	handleGenreDotSelect: (index: number) => void;
	nameOpacityStyle: any;
	backgroundOpacityStyle: any;
}

const GenreDotSelector = ({
	tracks,
	displayedTrack,
	// isExpanded,
	handleGenreDotSelect
}: GenreDotSelectorProps): JSX.Element => {
	const windowHeight = Dimensions.get("window").height;
	const windowWidth = Dimensions.get("window").width;
	return (
		<View
			style={[
				styles.genreNavContainer
				// {
				// 	height: isExpanded ? windowHeight : "auto",
				// 	width: isExpanded ? windowWidth * 0.84 : "auto"
				// }
			]}>
			{tracks.map((track, index) => (
				<Animated.View key={index} style={[styles.genreNavButton]}>
					<TouchableOpacity
						key={index}
						disabled={index === displayedTrack}
						onPress={() => {
							handleGenreDotSelect(index);
						}}>
						<View style={[styles.genreNavButton]}>
							<View
								style={[
									styles.genreDot,
									{
										height:
											index === 0 ? 16 : 15 - (index + 2),
										width:
											index === 0 ? 16 : 15 - (index + 2),
										borderColor:
											index === displayedTrack
												? track.accentColor
												: "none",
										borderWidth:
											index === displayedTrack ? 3 : 0,
										backgroundColor:
											displayedTrack === index
												? "#00000045"
												: "#000000"
									}
								]}
							/>
						</View>
					</TouchableOpacity>
				</Animated.View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	genreNavContainer: {
		display: "flex",
		backgroundColor: "green",
		flexDirection: "column",
		justifyContent: "flex-start",
		width: "auto",
		// paddingTop: RFValue(8, 580),
		alignItems: "center"
		// top: "3%",
		// left: "1%"
	},
	genreNavButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		width: 40,
		height: 40
	},
	genreDot: {
		borderRadius: 100
	}
});

export default GenreDotSelector;
