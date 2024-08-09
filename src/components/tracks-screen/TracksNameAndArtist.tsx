import { Typography } from "@/src/utils/constants/Styles";
import { RFValue } from "@/src/utils/helpers/Responsive";
import { NavigatorTrack, Track } from "@/src/utils/types/Tracks";
import { StyleSheet, Text, View } from "react-native";

interface TracksNameAndArtistProps {
	tracks: Track[];
	displayedTrack: number;
	navigatorTracks: NavigatorTrack[];
}

const TracksNameAndArtist = ({
	tracks,
	displayedTrack,
	navigatorTracks
}: TracksNameAndArtistProps): JSX.Element => {
	return (
		<View style={[styles.trackInfoContainer]}>
			<Text
				style={[
					Typography.smallText,
					{
						color:
							tracks[displayedTrack]?.genre_colour === 3
								? "#000000"
								: "#FFFFFF",
						textAlign: "center"
					}
				]}
				adjustsFontSizeToFit
				numberOfLines={1}>
				{tracks[displayedTrack]?.song_title}
			</Text>
			<View style={styles.artistNameContainer}>
				<Text
					adjustsFontSizeToFit
					numberOfLines={1}
					style={[
						Typography.smallText,
						{
							color: navigatorTracks[displayedTrack]?.accentColor,
							textAlign: "center"
						}
					]}>
					{tracks[displayedTrack]?.song_artist}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	trackInfoContainer: {
		height: "100%",
		width: "100%",
		justifyContent: "space-evenly",
		alignSelf: "center",
		paddingVertical: RFValue(2),
		paddingHorizontal: RFValue(3),
		borderRadius: RFValue(12),
		backgroundColor: "#00000025"
	},
	artistNameContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default TracksNameAndArtist;
