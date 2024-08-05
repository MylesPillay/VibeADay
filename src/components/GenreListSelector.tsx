import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigatorTrack } from "./DailyTrackGallery";

interface GenreListSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	handleGenreListSelection: (index: number) => void;
	genreNameAnimationStyle: any;
	dayListAnimationStyles: any;
	accentColor: string;
	drop_day?: string;
}

const days = [
	{ dayName: "Monday" },
	{ dayName: "Tuesday" },
	{ dayName: "Wednesday" },
	{ dayName: "Thursday" },
	{ dayName: "Friday" },
	{ dayName: "Saturday" },
	{ dayName: "Sunday" }
];

const GenreListSelector = ({
	tracks,
	displayedTrack,
	handleGenreListSelection,
	genreNameAnimationStyle,
	dayListAnimationStyles,
	accentColor,
	drop_day
}: GenreListSelectorProps): JSX.Element => {
	return (
		<View style={[styles.genreNavContainer]}>
			<View
				style={{
					alignSelf: "flex-end",
					alignContent: "center",
					marginTop: "12.5%",
					marginBottom: "2.5%"
				}}>
				{days.map((day, index) => (
					<Animated.View
						key={index}
						style={[
							styles.dayNameContainer,
							dayListAnimationStyles
						]}>
						<TouchableOpacity
							activeOpacity={0.6}
							disabled={index === displayedTrack}
							onPress={() => handleGenreListSelection(index)}>
							<Text
								style={[
									styles.dayText,
									{
										color:
											day.dayName === drop_day
												? accentColor
												: "#000000",
										textDecorationLine:
											day.dayName === drop_day
												? "underline"
												: "none",
										textDecorationColor:
											day.dayName === drop_day
												? accentColor
												: "#000000"
									}
								]}>
								{day.dayName}
							</Text>
						</TouchableOpacity>
					</Animated.View>
				))}
			</View>
			<View style={{ marginTop: "2.5%" }}>
				{tracks.map((track, index) => (
					<Animated.View
						key={index}
						style={[
							styles.navGenreNameContainer,
							genreNameAnimationStyle
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
		</View>
	);
};

const styles = StyleSheet.create({
	genreNavContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "70%",
		justifyContent: "space-between",
		// paddingTop: "60%",
		paddingVertical: "5%"
	},
	navGenreNameContainer: {
		height: "auto",
		paddingBottom: RFValue(8, 580),
		textAlign: "left",
		alignItems: "flex-start"
	},
	dayNameContainer: {
		height: "auto",
		paddingBottom: RFValue(8, 580),
		justifyContent: "center",
		alignItems: "flex-end"
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
		fontFamily: "sans-serif",
		fontWeight: "600",
		fontSize: 28
	},
	dayText: {
		fontFamily: "sans-serif",
		fontWeight: "600",
		fontSize: 28
	}
});

export default GenreListSelector;
