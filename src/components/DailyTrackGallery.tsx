import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { createClient } from "@supabase/supabase-js";
import StickyTopNavigator from "./sticky-top-nav/StickyTopNavigator";
import { genreColors } from "../constants/Colors";
import DailyTrackCard from "./DailyTrackCard";
import { PanGestureHandler, State } from "react-native-gesture-handler";

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
	trackIndex: number;
}
const TrackGallery = (): JSX.Element => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [navigatorTracks, setNavigatorTracks] = useState<NavigatorTrack[]>(
		[]
	);
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [displayedTrack, setDisplayedTrack] = React.useState<number>(0);
	const flatListRef = useRef<FlatList<Track> | null>(null);
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;
	function getGenreColor(colorId: number): string {
		return genreColors[colorId] || "#000000";
	}

	useEffect(() => {
		const fetchTracks = async () => {
			const supabase = createClient(
				process.env.SUPABASE_API_URL as string,
				process.env.SUPABASE_API_SECRET_ACCESS_TOKEN as string
			);
			try {
				let { data, error } = await supabase
					.from("dailyTracks")
					.select("*");
				if (error) throw error;
				if (data) {
					setTracks(data.slice(0, 5));
					setNavigatorTracks(
						data.map((track, index) => ({
							genreName: track.genre_title,
							bgColour: getGenreColor(
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
				setLoading(false);
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
					height: windowHeight,
					width: windowWidth,
					justifyContent: "flex-start",
					backgroundColor: "#000000",
					alignContent: "center",
					alignItems: "center"
				}}>
				<StickyTopNavigator
					tracks={navigatorTracks.slice(0, 5)}
					displayedTrack={displayedTrack}
					setDisplayedTrack={setDisplayedTrack}
					isExpanded={isExpanded}
					setIsExpanded={setIsExpanded}
				/>
				<DailyTrackCard
					trackLinks={trackLinks}
					trackName={tracks[displayedTrack].song_title}
					artistName={tracks[displayedTrack].song_artist}
					genreName={tracks[displayedTrack].genreName}
					artwork={{ uri: tracks[displayedTrack].artwork }}
					goToPreviousTrack={goToPreviousTrack}
					goToNextTrack={goToNextTrack}
					bgColour={navigatorTracks[displayedTrack]?.bgColour}
					isExpanded={isExpanded}
				/>
			</View>
		</PanGestureHandler>
	);
};

export default TrackGallery;
