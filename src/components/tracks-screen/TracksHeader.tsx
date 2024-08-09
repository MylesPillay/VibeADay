import { NavigatorTrack } from "@/src/utils/types/Tracks";
import { Dimensions, StyleSheet, View } from "react-native";
import GenreDotSelector from "../GenreDotSelector";
import GenreTitleComponent from "../GenreTitle";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";

import { getResponsiveFontSize } from "@/src/utils/helpers/Responsive";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface TracksHeaderProps {
	navigatorTracks: NavigatorTrack[];
	displayedTrack: number;
	setDisplayedTrack: React.Dispatch<React.SetStateAction<number>>;
	isExpanded: boolean;
	handleGenreDotSelect: (
		index: number,
		setDisplayedTrack: React.Dispatch<React.SetStateAction<number>>
	) => void;
	navigateToGenrePlaylist: () => void;
}

const TrackHeader = ({
	navigatorTracks,
	displayedTrack,
	setDisplayedTrack,
	isExpanded,
	handleGenreDotSelect,
	navigateToGenrePlaylist
}: TracksHeaderProps): JSX.Element => {
	return (
		<View style={styles.genreNavContainer}>
			<GenreDotSelector
				tracks={navigatorTracks.slice(0, 5)}
				displayedTrack={displayedTrack}
				accentColor={navigatorTracks[displayedTrack]?.accentColor}
				handleGenreDotSelect={(index) =>
					handleGenreDotSelect(index, setDisplayedTrack)
				}
			/>
			<View
				style={{
					flexDirection: "column",
					height: "auto",
					width: "auto",
					justifyContent: "space-between",
					alignContent: "center",
					alignItems: "center"
				}}>
				<View style={styles.genreTitleContainer}>
					<GenreTitleComponent
						tracks={navigatorTracks}
						displayedTrack={displayedTrack}
					/>
					{/* <View style={{ top: 3 }}> */}
					<View>
						<TouchableOpacity
							activeOpacity={1}
							onPress={navigateToGenrePlaylist}>
							<Animated.View>
								<MaterialCommunityIcons
									name={"chevron-up"}
									color={
										isExpanded
											? navigatorTracks[displayedTrack]
													?.bgColor
											: navigatorTracks[displayedTrack]
													?.accentColor
									}
									style={{
										transform: [
											{
												rotate: "90deg"
											}
										],
										right: 4
									}}
									size={getResponsiveFontSize(76)}
								/>
							</Animated.View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	spacerWrapper: {
		display: "flex",
		alignContent: "center",
		paddingVertical: windowHeight * 0.07,
		paddingHorizontal: windowWidth * 0.04,
		width: windowWidth
	},
	genreNavContainer: {
		display: "flex",
		width: windowWidth * 0.9,
		height: "auto",
		maxHeight: windowHeight * 0.08,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	genreTitleContainer: {
		display: "flex",
		flexDirection: "row",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-between"
	},

	chevronContainer: {
		justifyContent: "center"
	}
});

export default TrackHeader;
