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

interface GenreListSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	isExpanded: boolean;
	accentColor: string;
	handleGenreListSelection: (index: number) => void;
	nameOpacityStyle: any;
	drop_day?: string;
}

const days = [
	{ dayName: "Monday", date: "2023-08-07" },
	{ dayName: "Tuesday", date: "2023-08-08" },
	{ dayName: "Wednesday", date: "2023-08-09" },
	{ dayName: "Thursday", date: "2023-08-07" },
	{ dayName: "Friday", date: "2023-08-08" },
	{ dayName: "Saturday", date: "2023-08-09" },
	{ dayName: "Sunday", date: "2023-08-09" }
];

const GenreListSelector = ({
	tracks,
	displayedTrack,
	handleGenreListSelection,
	nameOpacityStyle,
	accentColor,
	drop_day
}: GenreListSelectorProps): JSX.Element => {
	return (
		<View
			style={[
				styles.genreNavContainer
				// { backgroundColor: tracks[displayedTrack]?.bgColour }
			]}>
			<View
				style={{
					alignSelf: "flex-end",
					alignContent: "center",
					marginRight: "5%",
					marginTop: "15%"
				}}>
				{days.map((day, index) => (
					<Animated.View
						key={index}
						style={[styles.dayNameContainer, nameOpacityStyle]}>
						<TouchableOpacity
							style={styles.navDayInitialButton}
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
			<View style={{}}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	genreNavContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
		paddingTop: "60%",
		paddingVertical: "5%"
	},
	navGenreNameContainer: {
		height: "auto",
		paddingBottom: RFValue(8, 580),
		textAlign: "left",
		alignItems: "flex-start",
		alignContent: "flex-start"
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
	navDayInitialButton: {},
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
