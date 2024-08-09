import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { NavigatorTrack } from "../utils/types/Tracks";
import { RFValue } from "react-native-responsive-fontsize";

interface GenreDotSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	handleGenreDotSelect: (index: number) => void;
	accentColor: string;
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GenreDotSelector = ({
	tracks,
	displayedTrack,
	handleGenreDotSelect,
	accentColor
}: GenreDotSelectorProps): JSX.Element => {
	return (
		<View
			style={[
				styles.genreNavContainer,
				{ width: "auto", height: windowHeight * 0.35 }
			]}>
			{tracks.map((track, index) => (
				<TouchableOpacity
					style={{
						padding: RFValue(4)
					}}
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
										index === 0 ? 16.5 : 18 - (index + 2.2),
									borderColor:
										index === displayedTrack
											? accentColor
											: "none",
									borderWidth:
										index === displayedTrack ? 2.5 : 0,
									backgroundColor:
										displayedTrack === index
											? "#00000000"
											: "#00000099"
								}
							]}
						/>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	genreNavContainer: {
		// display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		// paddingTop: windowHeight * 0.025,
		maxWidth: windowWidth * 0.07,
		alignItems: "center"
	},
	genreNavButton: {
		display: "flex",
		marginVertical: RFValue(2),
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
