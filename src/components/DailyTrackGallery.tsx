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
import DailyTrackCard from "./DailyTrackCard";
import ChevronComponent from "./sticky-top-nav/ChevronComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LinksComponent from "./LinksComponent";

interface Track {
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
}

export interface NavigatorTrack {
	genreName: string;
	bgColour: string;
	accentColor: string;
	trackIndex: number;
}
const TrackGallery = (): JSX.Element => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [navigatorTracks, setNavigatorTracks] = useState<NavigatorTrack[]>(
		[]
	);
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

	console.log(tracks, "this is the tracks");
	console.log(navigatorTracks, "this is the navigator tracks");

	const [flipChevrons, setFlipChevrons] = useState<boolean | undefined>(
		undefined
	);
	const topChevronPosition = useSharedValue(RFValue(5, 580));
	const bottomChevronPosition = useSharedValue(3);
	const translationXValue = useSharedValue(-200);
	const nameOpacityValue = useSharedValue(1);
	const backgroundOpacityValue = useSharedValue(1);
	const dotOpacityValue = useSharedValue(1);
	const handleGenreListSelection = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
		handleExpandGenreList();
	};
	const handleGenreDotSelect = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
	};
	const topChevronStyle = useAnimatedStyle(() => {
		return {
			top: topChevronPosition.value
		};
	});
	const backgroundOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: backgroundOpacityValue.value
		};
	});

	const bottomChevronStyle = useAnimatedStyle(() => {
		return {
			bottom: bottomChevronPosition.value
		};
	});

	const dotOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: dotOpacityValue.value
		};
	});

	const nameOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: nameOpacityValue.value,
			transform: [{ translateX: translationXValue.value }]
		};
	});
	const handleExpandGenreList = () => {
		if (isExpanded) {
			topChevronPosition.value = withTiming(RFValue(5, 580));
			bottomChevronPosition.value = withTiming(RFValue(5, 580));
			translationXValue.value = withTiming(-200, { duration: 400 });
			// backgroundOpacityValue.value = withTiming(0.1, { duration: 100 });
			dotOpacityValue.value = withTiming(1, { duration: 150 });
			nameOpacityValue.value = withTiming(0, { duration: 280 });
			setFlipChevrons(undefined);
			// Set isExpanded to false after a delay to allow animations to complete
			setIsExpanded(false);
			// setTimeout(() => {
			// }, 100);
		} else {
			// When expanding, set isExpanded to true first
			setIsExpanded(true);
			setFlipChevrons(true);
			topChevronPosition.value = withTiming(RFValue(5, 580));
			bottomChevronPosition.value = withTiming(RFValue(5, 580));
			backgroundOpacityValue.value = withTiming(1, {
				duration: 200
			});
			translationXValue.value = withTiming(15, { duration: 400 });
			dotOpacityValue.value = withTiming(0, { duration: 100 });
			nameOpacityValue.value = withTiming(1, { duration: 250 });
		}
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
					.select("*");
				if (error) throw error;
				if (data) {
					setTracks(data.slice(0, 8));
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
			} finally {
				// setLoading(false);
			}
		};

		fetchTracks();
	}, []);

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
					paddingHorizontal: "5%",
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
							width: "100%"
							// height: "100%"
						}}>
						<View style={styles.genreNavContainer}>
							<GenreDotSelector
								tracks={navigatorTracks.slice(0, 8)}
								displayedTrack={displayedTrack}
								handleGenreDotSelect={handleGenreDotSelect}
								handleGenreListSelection={
									handleGenreListSelection
								}
								setDisplayedTrack={setDisplayedTrack}
								setIsExpanded={setIsExpanded}
								accentColor={
									navigatorTracks[displayedTrack]?.accentColor
								}
								nameOpacityStyle={nameOpacityStyle}
								backgroundOpacityStyle={backgroundOpacityStyle}
							/>
							<View
								style={{
									flexDirection: "column",
									height: "auto",
									justifyContent: "space-between",
									alignContent: "center",
									alignItems: "center"
								}}>
								<View style={styles.genreTitleContainer}>
									<GenreTitleComponent
										tracks={navigatorTracks}
										displayedTrack={displayedTrack}
									/>
									<View
										style={{
											justifyContent: "flex-end",
											alignContent: "center"
										}}>
										<TouchableOpacity
											activeOpacity={1}
											onPress={handleExpandGenreList}>
											<Animated.View
												style={topChevronStyle}>
												<MaterialCommunityIcons
													name={"chevron-right"}
													color={
														navigatorTracks[
															displayedTrack
														]?.accentColor
													}
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
									<DailyTrackCard
										trackLinks={trackLinks}
										trackName={
											tracks[displayedTrack]?.song_title
										}
										artistName={
											tracks[displayedTrack]?.song_artist
										}
										genreName={
											tracks[displayedTrack]?.genreName
										}
										artwork={{
											uri: tracks[displayedTrack]?.artwork
										}}
										goToPreviousTrack={goToPreviousTrack}
										goToNextTrack={goToNextTrack}
										bgColour={
											navigatorTracks[displayedTrack]
												?.bgColour
										}
										accentColor={
											navigatorTracks[displayedTrack]
												?.accentColor
										}
										isExpanded={isExpanded}
									/>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.trackInfoContainer}>
						<Text style={styles.trackName}>
							{tracks[displayedTrack]?.song_title}
						</Text>
						<View style={styles.artistNameContainer}>
							<Text
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
					<View
						style={[
							styles.chevronContainer
							// {
							// 	backgroundColor:
							// 		navigatorTracks[displayedTrack]?.bgColour
							// }
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
				</View>
			</View>
		</PanGestureHandler>
	);
};
const styles = StyleSheet.create({
	mainTrackContainer: {
		display: "flex",
		flexDirection: "column",
		height: "100%"
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
		width: "90%",
		alignItems: "center"
	},

	chevronContainer: {
		alignItems: "flex-end",
		alignSelf: "flex-end",
		width: "100%"
	},
	trackInfoContainer: {
		height: "auto",
		alignSelf: "center",
		minWidth: "90%",
		minHeight: "9%",
		margin: "2%",
		marginTop: "10%",
		paddingVertical: "3%",
		padding: "6%",
		borderRadius: 7,
		backgroundColor: "#00000035"
	},
	trackName: {
		fontSize: RFValue(13, 580),
		letterSpacing: -0.1,
		fontWeight: "600",
		// marginBottom: "3%",
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
		fontSize: RFValue(11, 580),
		letterSpacing: -0.1,
		fontWeight: "600"
	}
});

export default TrackGallery;
