import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { NavigatorTrack } from "../utils/types/Tracks";

interface GenreDotSelectorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	handleGenreDotSelect: (index: number) => void;
	accentColor: string;
}

const GenreDotSelector = ({
	tracks,
	displayedTrack,
	handleGenreDotSelect,
	accentColor
}: GenreDotSelectorProps): JSX.Element => {
	return (
		<View style={[styles.genreNavContainer]}>
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
		width: "7%",
		paddingTop: "2%",
		height: "50%",
		alignItems: "center"
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
