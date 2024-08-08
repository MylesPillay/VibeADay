import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	getGenreAccentColor,
	getGenreColor
} from "@/src/utils/constants/Colors";
import { NavigatorTrack, Track } from "../../utils/types/Tracks";
import { useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";
import LoadingComponent from "@/src/components/LoadingScreen";
import { getResponsiveFontSize } from "@/src/utils/helpers/Responsive";
import { handleGenreDotSelect } from "@/src/utils/helpers/Functions";
import TrackHeader from "@/src/components/tracks-screen/TracksHeader";
import DailyTrackArtwork from "@/src/components/DailyTrackArtwork";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen() {
	const router = useRouter();
	const [tracks, setTracks] = useState<Track[]>([]);
	const [navigatorTracks, setNavigatorTracks] = useState<NavigatorTrack[]>(
		[]
	);
	const [selectedDay, setSelectedDay] = useState<string>("Sunday");
	const handleDaySelection = (day: string) => {
		setSelectedDay(day);
	};

	const handleGenreListSelection = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
	};
	useEffect(() => {
		const fetchTracks = async () => {
			const supabase = createClient(
				process.env.SUPABASE_API_URL as string,
				process.env.SUPABASE_API_SECRET_ACCESS_TOKEN as string
			);
			setLoading(true);
			try {
				let { data, error } = await supabase
					.from("daily_tracks")
					.select("*")
					.eq("drop_day", selectedDay)
					.order("created_at", { ascending: false })
					.limit(5);

				if (error) throw error;
				if (data) {
					setTracks(data);
					setNavigatorTracks(
						data.map((track, index) => ({
							genreName: track.genre_title,
							bgColor: getGenreColor(
								track.genre_colour as number
							),
							accentColor: getGenreAccentColor(
								track.genre_colour as number
							),
							trackIndex: index
						}))
					);
					setLoading(false);
				}
			} catch (error) {
				setError("Failed to fetch tracks");
				console.error(error);
			}
		};

		fetchTracks();
	}, [selectedDay]);

	console.log(tracks, "this is the tracks");
	console.log(navigatorTracks, "this is the navigator tracks");
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [displayedTrack, setDisplayedTrack] = React.useState<number>(0);
	const flatListRef = useRef<FlatList<Track> | null>(null);

	const [flipChevrons, setFlipChevrons] = useState<boolean | undefined>(
		undefined
	);

	const navigateToGenrePlaylist = () => {
		router.push({
			pathname: "./genre-playlist",
			params: {
				genreName: navigatorTracks[displayedTrack]?.genreName,
				bgColor: navigatorTracks[displayedTrack]?.bgColor,
				accentColor: navigatorTracks[displayedTrack]?.accentColor
			}
		});
	};
	return (
		<View
			style={[
				styles.spacerWrapper,
				{
					width: windowWidth,
					height: windowHeight,
					backgroundColor: navigatorTracks[displayedTrack]?.bgColor
				}
			]}>
			{loading && !tracks.length ? (
				<LoadingComponent />
			) : (
				<GestureHandlerRootView style={{}}>
					<TrackHeader
						navigatorTracks={navigatorTracks}
						displayedTrack={displayedTrack}
						setDisplayedTrack={setDisplayedTrack}
						isExpanded={isExpanded}
						handleGenreDotSelect={handleGenreDotSelect}
						navigateToGenrePlaylist={navigateToGenrePlaylist}
					/>
					<View
						style={{
							width: windowWidth * 0.81,
							marginLeft: windowWidth * 0.06
						}}>
						<DailyTrackArtwork
							artwork={{
								uri: tracks[displayedTrack]?.artwork
							}}
						/>
					</View>
				</GestureHandlerRootView>
			)}
		</View>
	);
}

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
		backgroundColor: "#00000025",
		width: windowWidth * 0.9,
		height: "auto",
		maxHeight: windowHeight * 0.08,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	genreTitleContainer: {
		display: "flex",
		// marginLeft: "-2%",
		flexDirection: "row",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "space-between"
	},

	chevronContainer: {
		justifyContent: "center" // alignItems: "flex-end",
		// width: "100%"
		// height: "auto"
	}
});
