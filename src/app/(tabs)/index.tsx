import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import DailyTrackGallery from "../../components/DailyTrackGallery";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	getGenreAccentColor,
	getGenreColor
} from "@/src/utils/constants/Colors";
import { NavigatorTrack, Track } from "../../utils/types/Tracks";
import { useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";
import LoadingComponent from "@/src/components/LoadingScreen";
import GenreDotSelector from "@/src/components/GenreDotSelector";
import GenreTitleComponent from "@/src/components/GenreTitle";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import { getResponsiveFontSize } from "@/src/utils/helpers/Responsive";
import { handleGenreDotSelect } from "@/src/utils/helpers/Functions";

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
					<View style={styles.genreNavContainer}>
						<GenreDotSelector
							tracks={navigatorTracks.slice(0, 5)}
							displayedTrack={displayedTrack}
							accentColor={
								navigatorTracks[displayedTrack]?.accentColor
							}
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
														? navigatorTracks[
																displayedTrack
														  ]?.bgColor
														: navigatorTracks[
																displayedTrack
														  ]?.accentColor
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
							{/* <View
								style={{
									width: "100%"
								}}>
								<DailyTrackArtwork
									artwork={{
										uri: tracks[displayedTrack]?.artwork
									}}
								/>
							</View> */}
						</View>
					</View>
					{/* <DailyTrackGallery /> */}
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
		// flex: 1,
		width: windowWidth * 0.9,
		height: "auto",
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
