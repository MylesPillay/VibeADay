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
import { NavigatorTrack } from "../utils/types/Tracks";
import { handleExpandGenreList } from "../utils/constants/Animations";
import { Typography } from "../utils/constants/Styles";
import { getResponsiveFontSize } from "../utils/helpers/Responsive";

interface GenreListSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	setFlipChevrons: React.Dispatch<React.SetStateAction<boolean | undefined>>;
	isExpanded: boolean;

	genreNameAnimationStyle: any;
	dayListAnimationStyles: any;
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
	accentColor: string;
	drop_day?: string;
	handleDaySelection: (selectedDay: string) => void;
	handleGenreListSelection: (selectedGenre: number) => void;
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

const windowHeight = Dimensions.get("window").height;

const GenreListSelector = ({
	tracks,
	displayedTrack,
	// setDisplayedTrack,
	// onPress,
	isExpanded,
	setIsExpanded,
	setFlipChevrons,
	genreNameAnimationStyle,
	dayListAnimationStyles,
	accentColor,
	drop_day,
	handleDaySelection,
	handleGenreListSelection
}: GenreListSelectorProps): JSX.Element => {
	return (
		<View
			style={[
				styles.genreNavContainer,
				{
					// maxHeight: windowHeight * 0.4,
					paddingVertical: getResponsiveFontSize(20, windowHeight)
				}
			]}>
			<View
				style={{
					alignSelf: "flex-end",
					alignContent: "center"
				}}>
				{days.map((day, index) => (
					<Animated.View
						key={index}
						style={[
							styles.dayNameContainer,
							dayListAnimationStyles
						]}>
						<TouchableOpacity
							activeOpacity={0.2}
							disabled={drop_day === day.dayName}
							onPress={() => handleDaySelection(day.dayName)}>
							<Text
								style={[
									Typography.h2Text,
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
			<View
				style={{
					paddingTop:
						windowHeight <= 900
							? windowHeight * 0.05
							: windowHeight * 0.15,
					bottom: 0,
					justifyContent: "center"
				}}>
				{tracks.map((track, index) => (
					<Animated.View
						key={index}
						style={[
							styles.navGenreNameContainer,
							genreNameAnimationStyle
						]}>
						<TouchableOpacity
							style={styles.navGenreTitleButton}
							activeOpacity={0.4}
							onPress={() => {
								handleGenreListSelection(index);
								handleExpandGenreList(
									isExpanded,
									setIsExpanded,
									setFlipChevrons
								);
							}}>
							<Text
								style={[
									Typography.h2Text,
									{
										color:
											index ===
											tracks[displayedTrack].trackIndex
												? accentColor
												: "#000000",
										textDecorationLine:
											index ===
											tracks[displayedTrack].trackIndex
												? "underline"
												: "none",
										textDecorationColor:
											index ===
											tracks[displayedTrack].trackIndex
												? accentColor
												: "#000000",
										textAlignVertical: "center"
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
		justifyContent: "space-between"
		// paddingVertical: "5%"
	},
	navGenreNameContainer: {
		height: "auto",
		paddingBottom: RFValue(6),
		width: "auto",
		maxWidth: "80%",
		textAlign: "left",
		alignItems: "flex-start"
	},
	dayNameContainer: {
		height: "auto",
		paddingBottom: RFValue(6),
		justifyContent: "center",
		alignItems: "flex-end"
	},
	navGenreTitleButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		paddingLeft: 0
	}
});

export default GenreListSelector;
