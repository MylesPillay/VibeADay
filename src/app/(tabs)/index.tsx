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
import { handleGenreDotSelect } from "@/src/utils/helpers/Functions";
import TrackHeader from "@/src/components/tracks-screen/TracksHeader";
import DailyTrackArtwork from "@/src/components/tracks-screen/DailyTrackArtwork";
import TracksNameAndArtist from "@/src/components/tracks-screen/TracksNameAndArtist";
import LinksComponent from "@/src/components/LinksComponent";
import Animated from "react-native-reanimated";
import {
	bottomChevronStyle,
	containerStyle,
	dayListAnimationStyles,
	genreNameTextAnimationStyle,
	handleExpandGenreList,
	topChevronStyle
} from "@/src/utils/constants/Animations";
import ChevronComponent from "@/src/components/sticky-top-nav/ChevronComponent";
import GenreListSelector from "@/src/components/GenreListSelector";
import { Collapsible } from "@/src/components/Collapsible";
import CollapsibleContainer from "@/src/components/tracks-screen/CollapsibleContainer";

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

	const trackLinks = {
		spotifyURL: tracks[displayedTrack]?.spotify_url,
		soundcloudURL: tracks[displayedTrack]?.soundcloud_url,
		bandcampURL: tracks[displayedTrack]?.bandcamp_url,
		appleMusicURL: tracks[displayedTrack]?.apple_music_url,
		facebookURL: tracks[displayedTrack]?.facebook_url,
		instagramURL: tracks[displayedTrack]?.instagram_url
	};

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
					backgroundColor: navigatorTracks[displayedTrack]?.bgColor
				}
			]}>
			{loading && !tracks.length ? (
				<LoadingComponent />
			) : (
				<View style={styles.screenContainer}>
					<GestureHandlerRootView style={{}}>
						<TrackHeader
							navigatorTracks={navigatorTracks}
							displayedTrack={displayedTrack}
							setDisplayedTrack={setDisplayedTrack}
							isExpanded={isExpanded}
							handleGenreDotSelect={handleGenreDotSelect}
							navigateToGenrePlaylist={navigateToGenrePlaylist}
						/>
						<View style={styles.trackArtworkContainer}>
							<DailyTrackArtwork
								artwork={{
									uri: tracks[displayedTrack]?.artwork
								}}
							/>
						</View>
						<View style={styles.trackNameAndArtistContainer}>
							<TracksNameAndArtist
								tracks={tracks}
								displayedTrack={displayedTrack}
								navigatorTracks={navigatorTracks}
							/>
						</View>
						<View style={styles.trackLinksContainer}>
							<LinksComponent
								trackLinks={trackLinks}
								bgColor={
									navigatorTracks[displayedTrack]?.bgColor
								}
								accentColor={
									navigatorTracks[displayedTrack]?.accentColor
								}
							/>
						</View>
					</GestureHandlerRootView>

					<CollapsibleContainer
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
						flipChevrons={flipChevrons}
						setFlipChevrons={setFlipChevrons}
						handleGenreListSelection={(index: number) => {
							handleGenreListSelection(index);
						}}
						navigatorTracks={navigatorTracks}
						displayedTrack={displayedTrack}
						tracks={tracks}
						handleDaySelection={handleDaySelection}
						genreNameTextAnimationStyle={
							genreNameTextAnimationStyle
						}
						dayListAnimationStyles={dayListAnimationStyles}
						topChevronStyle={topChevronStyle}
						bottomChevronStyle={bottomChevronStyle}
					/>
				</View>
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
		width: windowWidth,
		height: windowHeight
	},
	screenContainer: {
		height: "96%",
		width: "100%"
	},
	trackArtworkContainer: {
		width: windowWidth * 0.81,
		marginLeft: windowWidth * 0.06,
		marginVertical: windowHeight * 0.02,
		marginBottom: windowHeight * 0.025
	},
	trackNameAndArtistContainer: {
		alignSelf: "center",
		marginTop: windowHeight * 0.025,
		marginBottom: windowHeight * 0.025,
		width: windowWidth * 0.85,
		height: windowHeight * 0.1,
		maxHeight: windowHeight * 0.15,
		minWidth: windowWidth * 0.85
	},
	trackLinksContainer: {
		alignSelf: "center",
		width: windowWidth * 0.85,
		height: windowHeight * 0.1,
		maxHeight: windowHeight * 0.15,
		minWidth: windowWidth * 0.85
	}
});
