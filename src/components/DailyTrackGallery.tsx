import React, { useState, useRef, useEffect } from "react";
import {
	View,
	FlatList,
	Dimensions,
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	Text
} from "react-native";
import { createClient } from "@supabase/supabase-js";

import { genreAccentColors, genreColors } from "../constants/Colors";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import GenreDotSelector from "./GenreDotSelector";
import GenreTitleComponent from "./GenreTitle";
import ChevronComponent from "./sticky-top-nav/ChevronComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LinksComponent from "./LinksComponent";
import GenreListSelector from "./GenreListSelector";
import DailyTrackArtwork from "./DailyTrackArtwork";
import { useNavigation, useRouter } from "expo-router";

export interface Track {
	genreName: string;
	created_at: string;
	song_title: string;
	song_artist: string;
	artwork: string;
	spotify_url?: string;
	soundcloud_url?: string;
	bandcamp_url?: string;
	apple_music_url?: string;
	facebook_url?: string;
	instagram_url?: string;
	drop_day?:
		| "Monday"
		| "Tuesday"
		| "Wednesday"
		| "Thursday"
		| "Friday"
		| "Saturday"
		| "Sunday";
}

export interface NavigatorTrack {
	genreName: string;
	bgColour: string;
	accentColor: string;
	trackIndex: number;
}
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
			try {
				let { data, error } = await supabase
					.from("daily_tracks")
					.select("*")
					.eq("drop_day", selectedDay) // Filter by selected day
					.order("created_at", { ascending: false })
					.limit(5); // Limit to 5 tracks

				if (error) throw error;
				if (data) {
					setTracks(data);
					setNavigatorTracks(
						data.map((track, index) => ({
							genreName: track.genre_title,
							bgColour: getGenreColor(
								track.genre_colour as number
							),
							accentColor: getGenreAccentColor(
								track.genre_colour as number
							),
							trackIndex: index
						}))
					);
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
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

	function getGenreColor(colorId: number): string {
		return genreColors[colorId] || "#000000";
	}
	function getGenreAccentColor(colorId: number): string {
		return genreAccentColors[colorId] || "#000000";
	}
	const handleGenreListSelection = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
		handleExpandGenreList();
	};
	const handleGenreDotSelect = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
	};

	const [flipChevrons, setFlipChevrons] = useState<boolean | undefined>(
		undefined
	);
	// TOP CHEVRON ANIMATION STYLE VARIABLES
	const topChevronPosition = useSharedValue(RFValue(5, 580));
	const topChevronStyle = useAnimatedStyle(() => {
		return {
			top: topChevronPosition.value
		};
	});

	// BOTTOM CHEVRON ANIMATION STYLE VARIABLES
	const bottomChevronPosition = useSharedValue(3);
	const bottomChevronStyle = useAnimatedStyle(() => {
		return {
			bottom: bottomChevronPosition.value
		};
	});

	// ANIMATION TEXT SLIDE IN AND OPACITY FADE IN  STYLE VARIABLES
	const translationXValue = useSharedValue(-200);
	const translationXValueDays = useSharedValue(0);

	const nameOpacityValue = useSharedValue(1);

	const genreNameTextAnimationStyle = useAnimatedStyle(() => {
		return {
			opacity: nameOpacityValue.value,
			transform: [{ translateX: translationXValue.value }]
		};
	});
	const dayListAnimationStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translationXValueDays.value }]
		};
	});

	// BOTTOM NAV BAR CHEVRON CONTAINER ANIMATION AND HEIGHT STYLE VARIABLES
	const containerHeight = useSharedValue(130);
	const containerStyle = useAnimatedStyle(() => {
		return {
			height: containerHeight.value,
			zIndex: isExpanded ? 100 : 250
		};
	});

	const handleExpandGenreList = () => {
		if (!isExpanded) {
			setIsExpanded(true);
			setFlipChevrons(true);
			setTimeout(() => {
				topChevronPosition.value = withTiming(RFValue(15, 580), {
					duration: 100
				});
				bottomChevronPosition.value = withTiming(RFValue(8, 580), {
					duration: 150
				});
			}, 150);
			containerHeight.value = withTiming(windowHeight, { duration: 200 });
			nameOpacityValue.value = withTiming(1, {
				duration: 250
			});
			translationXValue.value = withTiming(15, {
				duration: 450
			});
			translationXValueDays.value = withTiming(-20, {
				duration: 450
			});
		} else {
			setIsExpanded(false);
			setFlipChevrons(false);
			containerHeight.value = withTiming(140, { duration: 10 });
			setTimeout(() => {
				topChevronPosition.value = withTiming(RFValue(3, 580), {
					duration: 150
				});
				bottomChevronPosition.value = withTiming(RFValue(5, 580), {
					duration: 150
				});
			}, 11);

			translationXValue.value = withTiming(-200, {
				duration: 150
			});
			translationXValueDays.value = withTiming(200, {
				duration: 150
			});
		}
	};

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
			params: { genreName: navigatorTracks[displayedTrack]?.genreName }
		});
	};

	console.log(trackLinks, "this is the track links");
	if (loading) {
		return <ActivityIndicator size='large' />;
	}

	if (error) {
		console.log(error, "this is the error message");
	}
	console.log(navigatorTracks, "this is the navigator tracks");

	return (
		<PanGestureHandler onHandlerStateChange={onGestureEvent}>
			<View
				style={{
					display: "flex",
					paddingVertical: "5%",

					paddingTop: "20%",
					height: windowHeight,
					width: windowWidth,
					justifyContent: "flex-start",
					backgroundColor: navigatorTracks[displayedTrack]?.bgColour
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
								handleGenreDotSelect={handleGenreDotSelect}
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
									<View style={{}}>
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
															  ]?.bgColour
															: navigatorTracks[
																	displayedTrack
															  ]?.accentColor
													}
													style={{
														transform: [
															{ rotate: "90deg" }
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
					<View style={styles.trackInfoContainer}>
						<Text
							style={styles.trackName}
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
						bgColour={navigatorTracks[displayedTrack]?.bgColour}
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
									navigatorTracks[displayedTrack]?.bgColour
							}
						]}>
						{isExpanded ? (
							<View style={{ zIndex: 300, width: "100%" }}>
								<GenreListSelector
									tracks={navigatorTracks}
									displayedTrack={displayedTrack}
									handleGenreListSelection={
										handleGenreListSelection
									}
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
								/>
							</View>
						) : (
							<></>
						)}
						<View
							style={[
								styles.chevronContainer,
								{
									bottom: isExpanded ? "1%" : "40%",
									display: "flex",
									justifyContent: "center"
								}
							]}>
							<ChevronComponent
								handleExpandGenreList={handleExpandGenreList}
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
		height: "100%",
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
		width: "100%"
	},
	genreTitleContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "93%",
		alignItems: "center"
	},

	chevronContainer: {
		justifyContent: "center",
		alignItems: "flex-end",
		width: "100%"
	},
	trackInfoContainer: {
		height: "auto",
		minHeight: "12%",
		justifyContent: "space-evenly",
		alignSelf: "center",
		width: "90%",
		margin: "2%",
		marginTop: "10%",
		paddingVertical: "3%",
		padding: "6%",
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
		width: "110%",
		marginBottom: "2.5%",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default TrackGallery;
