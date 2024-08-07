import React from "react";
import { View, StyleSheet } from "react-native";
import { Track } from "./DailyTrackGallery";
import PlaylistItem from "./PlaylistItem";
import { router } from "expo-router";
import GenreTitleComponent from "./GenreTitle";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export type GenrePlaylistParams = {
	genreName: string;
};

interface GenrePlaylistComponentProps {
	tracks: Track[];
	genreName: string;
	backgroundColor: string;
	accentColor: string;
}
const GenrePlaylistComponent = ({
	tracks,
	genreName,
	backgroundColor,
	accentColor
}: GenrePlaylistComponentProps): JSX.Element => {
	console.log(tracks, "this is the tracks");
	const goBack = () => {
		router.back();
	};

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				justifyContent: "flex-start",
				alignItems: "center",
				paddingTop: "21%",
				paddingLeft: "2%",
				width: "91%",
				height: "100%",
				backgroundColor: backgroundColor
			}}>
			<View style={styles.genreTitleContainer}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						goBack();
					}}
					style={styles.chevronIcon}>
					<MaterialCommunityIcons
						name={"chevron-up"}
						color={accentColor}
						style={{
							transform: [{ rotate: "-90deg" }]
						}}
						size={46}
					/>
				</TouchableOpacity>
				<View style={{ width: "86%" }}>
					<GenreTitleComponent
						displayedTrack={0}
						genreName={genreName as string}
						accentColor={accentColor}
					/>
				</View>
			</View>
			<View
				style={{
					width: "100%",
					paddingLeft: "6%",
					paddingRight: "8%",

					alignItems: "center",
					justifyContent: "flex-start"
				}}>
				{tracks.map((track, index) => (
					<PlaylistItem
						key={index}
						track={track}
						accentColor={accentColor}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	genreTitleContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		paddingHorizontal: "2.75%",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "flex-start",
		marginBottom: 20
	},
	chevronIcon: {
		maxWidth: 55,
		bottom: 4
	}
});

export default GenrePlaylistComponent;
