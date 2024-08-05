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
											index === 0
												? 16.5
												: 17.5 - (index + 2.2),
										width:
											index === 0
												? 16.5
												: 18 - (index + 2.2),
										borderColor:
											index === displayedTrack
												? track.accentColor
												: "none",
										borderWidth:
											index === displayedTrack ? 2.5 : 0,
										backgroundColor:
											displayedTrack === index
												? "#00000010"
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
		// backgroundColor: "green",
		flexDirection: "column",
		justifyContent: "flex-start",
		width: "auto",
		paddingTop: "2%",
		height: "50%",
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
		width: 45,
		height: 45
	},
	genreDot: {
		borderRadius: 100
	}
});

export default GenreDotSelector;
