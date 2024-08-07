import React, { useState, useRef, useEffect } from "react";
import {
	View,
	FlatList,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Text
} from "react-native";
import { createClient } from "@supabase/supabase-js";

import { getGenreAccentColor, getGenreColor } from "../utils/constants/Colors";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import GenreDotSelector from "./GenreDotSelector";
import GenreTitleComponent from "./GenreTitle";
import ChevronComponent from "./sticky-top-nav/ChevronComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LinksComponent from "./LinksComponent";
import GenreListSelector from "./GenreListSelector";
import DailyTrackArtwork from "./DailyTrackArtwork";
import { useRouter } from "expo-router";
import LoadingComponent from "./LoadingScreen";
import { NavigatorTrack, Track } from "../utils/types/Tracks";

import {
	bottomChevronStyle,
	containerStyle,
	dayListAnimationStyles,
	genreNameTextAnimationStyle,
	handleExpandGenreList,
	topChevronStyle
} from "../utils/constants/Animations";
import {
	handleGenreDotSelect,
	handleGenreListSelection
} from "../utils/helpers/functions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TrackGallery = (): JSX.Element => {
	const router = useRouter();
	const [tracks, setTracks] = useState<Track[]>([]);
	const [navigatorTracks, setNavigatorTracks] = useState<NavigatorTrack[]>(
		[]
	);
	const [selectedDay, setSelectedDay] = useState<string>("Sunday");
	const handleDaySelection = (day: string) => {
		setSelectedDay(day);
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

	// ANIMATE SCROLL THROUGH TRACKS UP AND DOWN HANDLERS
	const goToPreviousTrack = () => {
		if (displayedTrack > 0) {
			flatListRef.current?.scrollToIndex({
				index: displayedTrack > 0 ? displayedTrack - 1 : displayedTrack,
				animated: true
			});
			setDisplayedTrack(displayedTrack - 1);
		}
	};

	const goToNextTrack = () => {
		if (displayedTrack < tracks.length - 1) {
			flatListRef.current?.scrollToIndex({
				index: displayedTrack < 4 ? displayedTrack + 1 : displayedTrack,
				animated: true
			});
			setDisplayedTrack(displayedTrack + 1);
		}
	};
	const onGestureEvent = (event: {
		nativeEvent: { translationY: any; state: any };
	}) => {
		const { translationY, state } = event.nativeEvent;
		if (state === State.END) {
			if (translationY < -50) {
				goToNextTrack();
			} else if (translationY > 50) {
				goToPreviousTrack();
			}
		}
	};
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

	// console.log(trackLinks, "this is the track links");

	// if (error) {
	//  console.log(error, "this is the error message");
	// }
	// console.log(navigatorTracks, "this is the navigator tracks");

	return loading && !tracks.length ? (
		<LoadingComponent />
	) : (
		<PanGestureHandler onHandlerStateChange={onGestureEvent}>
			<View
				style={{
					display: "flex",
					paddingVertical: "5%",
					height: windowHeight,
					width: windowWidth,
					justifyContent: "flex-start",
					backgroundColor: navigatorTracks[displayedTrack]?.bgColor
				}}>
				<View style={styles.mainTrackContainer}>
					<View
						style={{
							flexDirection: "row",
							width: "100%",
							justifyContent: "space-between"
						}}>
						<View style={[styles.genreNavContainer]}>
							<GenreDotSelector
								tracks={navigatorTracks.slice(0, 5)}
								displayedTrack={displayedTrack}
								handleGenreDotSelect={(index) =>
									handleGenreDotSelect(
										index,
										setDisplayedTrack
									)
								}
							/>
							<View
								style={{
									flexDirection: "column",
									height: "auto",
									width: "102%",
									justifyContent: "space-between",
									alignContent: "center",
									alignItems: "center"
								}}>
								<View style={styles.genreTitleContainer}>
									<GenreTitleComponent
										tracks={navigatorTracks}
										displayedTrack={displayedTrack}
									/>
									<View style={{ top: 3 }}>
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
														]
													}}
													size={46}
												/>
											</Animated.View>
										</TouchableOpacity>
									</View>
								</View>
								<View
									style={{
										width: "100%",
										marginTop: "10%"
									}}>
									<DailyTrackArtwork
										artwork={{
											uri: tracks[displayedTrack]?.artwork
										}}
									/>
								</View>
							</View>
						</View>
					</View>
					<View
						style={[
							styles.trackInfoContainer,
							{ minHeight: windowHeight * 0.1 }
						]}>
						<Text
							style={[
								styles.trackName,
								{
									color:
										tracks[displayedTrack]?.genre_colour ===
										3
											? "#000000"
											: "#FFFFFF"
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
									styles.artistName,
									{
										color: navigatorTracks[displayedTrack]
											?.accentColor
									}
								]}>
								{tracks[displayedTrack]?.song_artist}
							</Text>
						</View>
					</View>

					<LinksComponent
						trackLinks={trackLinks}
						bgColor={navigatorTracks[displayedTrack]?.bgColor}
						accentColor={
							navigatorTracks[displayedTrack]?.accentColor
						}
					/>
					<Animated.View
						style={[
							styles.expandableContainer,
							containerStyle,
							{
								backgroundColor:
									navigatorTracks?.[displayedTrack]?.bgColor
							}
						]}>
						{isExpanded ? (
							<View
								style={{
									zIndex: 300,
									width: "100%",

									backgroundColor:
										navigatorTracks?.[displayedTrack]
											?.bgColor,
									height: "100%",
									paddingVertical: "5%"
								}}>
								<GenreListSelector
									tracks={navigatorTracks}
									displayedTrack={displayedTrack}
									onPress={(index: number) => {
										handleGenreListSelection(
											index,
											setDisplayedTrack,
											() =>
												handleExpandGenreList(
													isExpanded,
													setIsExpanded,
													setFlipChevrons
												)
										);
									}}
									genreNameAnimationStyle={
										genreNameTextAnimationStyle
									}
									dayListAnimationStyles={
										dayListAnimationStyles
									}
									accentColor={
										navigatorTracks[displayedTrack]
											?.accentColor
									}
									drop_day={tracks[displayedTrack]?.drop_day}
									handleDaySelection={handleDaySelection}
									setIsExpanded={setIsExpanded}
								/>
							</View>
						) : (
							<></>
						)}
						<View
							style={[
								styles.chevronContainer,
								{
									top: isExpanded ? "5%" : "2%",
									display: "flex",
									zIndex: 500
								}
							]}>
							<ChevronComponent
								onPress={() =>
									handleExpandGenreList(
										isExpanded,
										setIsExpanded,
										setFlipChevrons
									)
								}
								topChevronStyle={topChevronStyle}
								bottomChevronStyle={bottomChevronStyle}
								flipChevrons={!!flipChevrons}
								accentColor={
									navigatorTracks[displayedTrack]?.accentColor
								}
							/>
						</View>
					</Animated.View>
				</View>
			</View>
		</PanGestureHandler>
	);
};
const styles = StyleSheet.create({
	mainTrackContainer: {
		display: "flex",
		flexDirection: "column",
		paddingHorizontal: "5%"
	},
	modal: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center"
	},
	genreNavContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "99%"
	},
	genreTitleContainer: {
		display: "flex",
		marginLeft: "-2%",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "93%",
		alignItems: "center"
	},

	chevronContainer: {
		justifyContent: "center",
		alignItems: "flex-end",
		height: "180%",
		width: "100%"
	},
	trackInfoContainer: {
		height: "auto",
		justifyContent: "space-evenly",
		alignSelf: "center",
		width: "90%",
		margin: "2%",
		marginTop: "8%",
		paddingVertical: "2%",
		borderRadius: 7,
		backgroundColor: "#00000025"
	},
	trackName: {
		fontSize: RFValue(13, 580),
		letterSpacing: -0.1,
		fontWeight: "600",
		textAlign: "center",
		color: "#FFFFFF"
	},
	artistNameContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "center"
	},
	artistName: {
		fontSize: RFValue(13, 580),
		letterSpacing: -0.1,
		fontWeight: "600"
	},
	expandableContainer: {
		position: "absolute",
		bottom: 0,
		maxHeight: "55%",
		width: "110%",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default TrackGallery;
