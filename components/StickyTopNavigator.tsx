import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigatorTrack } from "./DailyTrackGallery";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface StickyTopNavigatorProps {
	tracks: NavigatorTrack[];
	displayedTrack: number;
	setDisplayedTrack: React.Dispatch<React.SetStateAction<number>>;
}

const StickyTopNavigator = ({
	tracks,
	displayedTrack,
	setDisplayedTrack
}: StickyTopNavigatorProps): JSX.Element => {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

	function handleGenreSelection(selectedTrack: number): void {
		return setDisplayedTrack(selectedTrack);
	}
	function handleExpandGenreList(isExpanded: boolean): void {
		return setIsExpanded(!isExpanded);
	}

	return (
		<View style={[styles.stickyHeader]}>
			<View style={styles.genreNavContainer}>
				{tracks.map((track, index) =>
					!isExpanded ? (
						<TouchableOpacity
							key={index}
							disabled={index === displayedTrack ? true : false}
							onPress={() => {
								handleGenreSelection(index);
							}}>
							<View style={[styles.genreNavButton]}>
								<View
									style={[
										styles.genreDot,
										{
											height: 14 - (index + 2),
											width: 14 - (index + 2),
											backgroundColor:
												displayedTrack === index
													? "#00000045"
													: "#000000"
										}
									]}
								/>
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							key={index}
							disabled={index === displayedTrack ? true : false}
							onPress={() => {
								handleGenreSelection(index);
							}}>
							<View
								style={[
									styles.expandedGenreNavContainer,
									{
										backgroundColor:
											tracks[displayedTrack].bgColour
									}
								]}>
								<Text style={styles.genreText}>
									{track.genreName}
								</Text>
							</View>
						</TouchableOpacity>
					)
				)}
			</View>
			{/* <View style={styles.titleContainer}>
				<Text style={styles.titleText}>
					{tracks[displayedTrack].genreName}
				</Text>
			</View> */}
			<View style={styles.chevronIconsContainer}>
				<TouchableOpacity
					onPress={() => handleExpandGenreList(isExpanded)}>
					{isExpanded ? (
						<>
							<View style={{ top: "21%" }}>
								<MaterialCommunityIcons
									name={"chevron-down"}
									color={"#FFFFFF"}
									size={45}
								/>
							</View>
							<View style={{ bottom: "22%" }}>
								<MaterialCommunityIcons
									name={"chevron-up"}
									color={"#FFFFFF"}
									size={45}
								/>
							</View>
						</>
					) : (
						<>
							<View style={{ top: "12%" }}>
								<MaterialCommunityIcons
									name={"chevron-up"}
									color={"#FFFFFF"}
									size={45}
								/>
							</View>
							<View style={{ bottom: "12%" }}>
								<MaterialCommunityIcons
									name={"chevron-down"}
									color={"#FFFFFF"}
									size={45}
								/>
							</View>
						</>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	stickyHeader: {
		display: "flex",
		position: "absolute",
		zIndex: 100,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		height: "100%"
	},
	genreNavContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		top: "44%",
		left: "1%"
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
	},
	expandedGenreNavContainer: {
		width: "100%",
		padding: 10,
		height: 40,
		marginVertical: 5,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center"
	},
	titleContainer: {
		display: "flex",
		justifyContent: "flex-start",
		marginTop: 15,
		marginLeft: "10%",
		height: "auto",
		width: "auto",
		flex: 1,
		alignItems: "center"
	},
	chevronIconsContainer: {
		display: "flex",
		flexDirection: "column",
		margin: "3%",
		marginTop: "20%",
		justifyContent: "space-around",
		width: "12%",
		height: "5%",
		alignItems: "center",
		alignSelf: "flex-start"
		// backgroundColor: "#000000"
	},
	titleText: { fontWeight: "800", color: "white", fontSize: 20 },

	genreText: {
		fontWeight: "500",
		textAlign: "left",
		color: "green"
	}
});

export default StickyTopNavigator;
